# n8n Workflow: Batch Image Generation + Cloudinary Upload

## Overview
Reads CSV prompt files → calls OpenRouter (Nano Banana / gemini-2.5-flash-image) → uploads to Cloudinary → outputs lookup table.

## Prerequisites
- OpenRouter API key (already in .env)
- Cloudinary credentials (already connected)
- The 3 CSV files in this folder

---

## Workflow Steps

### 1. Trigger: Manual
- Type: Manual trigger
- Run once to generate all images

### 2. Read CSV Files
- Node: Read Binary Files (or Spreadsheet File node)
- Read all 3 CSVs:
  - `prompts-shot-types.csv` (30 rows)
  - `prompts-visual-actions.csv` (14 rows)
  - `prompts-format-thumbnails.csv` (24 rows)
- Merge into one stream (68 items)

### 3. Loop: For Each Prompt
- Node: Split In Batches
- Batch size: 1 (one at a time to avoid rate limits)
- Wait: 2 seconds between batches (Nano Banana rate limit safety)

### 4. Call OpenRouter API
- Node: HTTP Request
- Method: POST
- URL: `https://openrouter.ai/api/v1/chat/completions`
- Headers:
  ```
  Authorization: Bearer {{$env.OPENROUTER_API_KEY}}
  Content-Type: application/json
  HTTP-Referer: https://creatorscans.com
  X-Title: Creator Scans Image Generation
  ```
- Body (JSON):
  ```json
  {
    "model": "google/gemini-2.5-flash-image",
    "modalities": ["image"],
    "messages": [
      {
        "role": "user",
        "content": "{{$json.prompt}}"
      }
    ],
    "image_config": {
      "aspect_ratio": "9:16"
    }
  }
  ```

### 5. Extract Base64 Image
- Node: Code (JavaScript)
- Extract the base64 image from the response:
  ```javascript
  const response = $input.first().json;
  const imageData = response.choices[0].message.images[0].image_url.url;
  // Remove the data:image/png;base64, prefix
  const base64 = imageData.replace(/^data:image\/\w+;base64,/, '');

  return [{
    json: {
      filename: $('Loop').item.json.filename,
      category: $('Loop').item.json.category,
      shot_type: $('Loop').item.json.shot_type || '',
      visual_action: $('Loop').item.json.visual_action || '',
      format_name: $('Loop').item.json.format_name || '',
      base64: base64
    }
  }];
  ```

### 6. Upload to Cloudinary
- Node: HTTP Request
- Method: POST
- URL: `https://api.cloudinary.com/v1_1/{{$env.CLOUDINARY_CLOUD_NAME}}/image/upload`
- Body (Form Data):
  ```
  file: data:image/png;base64,{{$json.base64}}
  upload_preset: (your unsigned preset, or use api_key + api_secret for signed)
  public_id: creator-scans/storyboard/{{$json.category}}/{{$json.filename}}
  folder: creator-scans/storyboard
  tags: creator-scans, storyboard, {{$json.category}}
  context: category={{$json.category}}|name={{$json.shot_type || $json.visual_action || $json.format_name}}
  ```

### 7. Collect Results
- Node: Code (JavaScript)
- Build the lookup entry:
  ```javascript
  return [{
    json: {
      filename: $json.filename,
      category: $json.category,
      name: $json.shot_type || $json.visual_action || $json.format_name,
      cloudinary_url: $json.secure_url,
      public_id: $json.public_id
    }
  }];
  ```

### 8. Write Lookup Table
- Node: Spreadsheet File (Write)
- Output: `image-lookup-table.csv`
- Columns: filename, category, name, cloudinary_url, public_id

---

## Cloudinary Folder Structure
```
creator-scans/
└── storyboard/
    ├── shot_type/
    │   ├── shot-single-A.png
    │   ├── shot-two-shot-A.png
    │   └── ... (30 images)
    ├── visual_action/
    │   ├── action-yapping-A.png
    │   ├── action-demo-B.png
    │   └── ... (14 images)
    └── format/
        ├── format-us-vs-them-A.png
        ├── format-feature-point-out-B.png
        └── ... (24 images)
```

---

## Error Handling
- If OpenRouter returns an error (rate limit, content policy), log the filename and skip
- Retry failed items at the end with a 5-second delay
- The workflow should output both successful uploads AND a list of failures

---

## Estimated Cost
- 68 images × ~$0.01-0.02 per image = $0.70-1.40 total
- Cloudinary storage: negligible (68 images × ~200KB = ~14MB)

---

## After Running
1. Review the generated images in Cloudinary
2. Re-generate any that don't look right (update the prompt, run just that row)
3. The `image-lookup-table.csv` becomes the reference for the n8n script generation workflow
4. In the script generation workflow, map shot_type/visual_action/format names to cloudinary_urls
