# Creator Scans — Softr Database Schema Reference

## Database: Content Tracking App
**ID:** `11fb1760-0482-40fb-be23-52537f179e3f`

---

## Brands (id: DqAtvmhge23QvA)
| Field | Type | ID |
|-------|------|----|
| Brand name | SINGLE_LINE_TEXT | eLXLv |
| Logo | URL | dcFge |
| Industry | SELECT | leTMr |
| Category | SELECT | PMVcv |
| Stage | SELECT | Ocg10 |
| Geography | SELECT | K0Q7p |
| TikTok | URL | H7Pbp |
| Website | URL | UcFqD |
| Target audience summary | SINGLE_LINE_TEXT | VypCI |
| Brand voice/tone | SINGLE_LINE_TEXT | WauKx |
| Core pain points solved | LONG_TEXT | HG8G4 |
| Positioning statement | SINGLE_LINE_TEXT | fnKei |
| Status | SELECT | fdWjt |
| Brand context | LONG_TEXT | tRjSk |
| Primary Platforms | SELECT | msnGW |
| Desire Drivers Summary | LONG_TEXT | 952n2 |
| Date Added | DATETIME | UyYiV |

## Products (id: zJPuKZNjMXTqUU)
| Field | Type | ID | Notes |
|-------|------|----|-------|
| Product_title | SINGLE_LINE_TEXT | AHF5Y | |
| Views_display | SINGLE_LINE_TEXT | Cfn4N | |
| Product_image_url | URL | E4EKm | |
| Product_link | URL | 4DQmQ | |
| Shop_logo_url | URL | tC9ZL | |
| Social1 | URL | TEETA | |
| Shop_name | LINKED_RECORD | dGJHG | -> Brands |
| Units_sold | SINGLE_LINE_TEXT | zNJ57 | |
| Average_price | CURRENCY | v3IfP | |
| Product_gmv | SINGLE_LINE_TEXT | RiiGL | |
| Videos | SINGLE_LINE_TEXT | FFSGd | |
| Categories | SELECT | XTQgx | |
| Date_captured | DATETIME | cfgWC | |
| Research | LINKED_RECORD | eM3gA | -> Research |
| Strategy | LINKED_RECORD | TTZV4 | -> Strategy |

## Videos (id: dk40PsHx4tsnIi)
| Field | Type | ID | Notes |
|-------|------|----|-------|
| Video | URL | 177Xh | |
| Trending_product | LINKED_RECORD | lfDxB | -> Products |
| Created at | DATETIME | H1vRs | |

## Research (id: sbnawqOfGV4E1t)
| Field | Type | ID |
|-------|------|----|
| Research ID | AUTONUMBER | FhHC7 |
| Product Type | SELECT | u8sss |
| Review Count | NUMBER | LLfso |
| Review Sources | SELECT | lmWoN |
| Pain Points | LONG_TEXT | lxKKo |
| Trigger Moments | LONG_TEXT | V4GsI |
| Objections | LONG_TEXT | Edrdt |
| Transformations | LONG_TEXT | Sq47t |
| Failed Solutions | LONG_TEXT | nzgNd |
| Desire Drivers | LONG_TEXT | hvJJL |
| Identity Signals | LONG_TEXT | 4QcRY |
| Emotional Payoffs | LONG_TEXT | I7KOi |
| Lifestyle Associations | LONG_TEXT | W1e2j |
| Upgrade Language | LONG_TEXT | 7SctS |
| Standout Quotes | LONG_TEXT | 91Zlg |
| Audience Segments | LONG_TEXT | jKXO1 |
| Quick-Win Hooks | LONG_TEXT | NK4Kd |
| Raw Review Database | URL | Ey7oM |
| Date Completed | CREATED_AT | LztNk |
| Product | LINKED_RECORD | PqSvO |
| Strategy | LINKED_RECORD | ANAiO |

## Strategy (id: ZS2TbGIKX1iKZm)
| Field | Type | ID |
|-------|------|----|
| Strategy ID | AUTONUMBER | 531z8 |
| Organising Principle | SELECT | SM0zZ |
| Principle Reasoning | LONG_TEXT | Bq5vc |
| Pain Points (Mapped) | LONG_TEXT | QOaZ5 |
| Desire Drivers (Mapped) | LONG_TEXT | wwoT1 |
| Audience Segments (Mapped) | LONG_TEXT | C9M5x |
| Pain/Audience Matrix | LONG_TEXT | vv7xU |
| Desire/Audience Matrix | LONG_TEXT | BSyuI |
| Messaging Angles | LONG_TEXT | koB5Z |
| Motivators | LONG_TEXT | gdL6A |
| Concepts | LONG_TEXT | KhNCR |
| Pivot Mechanics | LONG_TEXT | eOTlz |
| Oddly Specific Data | LONG_TEXT | OVtdR |
| Date Completed | CREATED_AT | 9F7tF |
| Product | LINKED_RECORD | evMbo |
| Research | LINKED_RECORD | kofho |

## Storyboard/Script (id: moJabgXWJZmGeK)
| Field | Type | ID |
|-------|------|----|
| Concept Name | SINGLE_LINE_TEXT | yfiqQ |
| Full Script | LONG_TEXT | AtsZG |
| Frame | NUMBER | sAfaI |
| Script ID | RECORD_ID | cywD0 |
| Section | SELECT | qNYv4 |
| Section Details | SELECT | pR9P6 |
| Shot Type | SELECT | WqgDZ |
| Script | LONG_TEXT | ofrnY |
| Voiceover | SELECT | PWiAB |
| Caption | SELECT | pBk7E |
| Visual Action | SELECT | aw8mj |
| Scene Description | LONG_TEXT | gAeK8 |
| Timestamp | SINGLE_LINE_TEXT | 0TuwG |
| Inspo | ATTACHMENT | 8o0uQ |
| Shot Example | ATTACHMENT | DMzLF |

## Users (id: yZSKdACWobx3KB) — Key Creator Fields
| Field | Type | ID | Notes |
|-------|------|----|-------|
| Email | EMAIL | T3cFq | |
| Full Name | SINGLE_LINE_TEXT | PXdkq | |
| Avatar | ATTACHMENT | 8L9hV | |
| TikTok Username | SINGLE_LINE_TEXT | uZ8z0 | |
| Bio | LONG_TEXT | on8OZ | |
| Tagline | SINGLE_LINE_TEXT | v2Gu1 | |
| My Goal | LONG_TEXT | uNdfV | |
| City | SINGLE_LINE_TEXT | z4TF1 | |
| Age | SELECT | aNbbk | |
| Pronouns | SELECT | W933n | |
| Gender | SELECT | ZrMCm | |
| Address | LONG_TEXT | ONDAV | |
| Birthday | DATETIME | A79E9 | |
| Job Title | SINGLE_LINE_TEXT | 6aChZ | |
| Industry | SELECT | aDyIX | |
| Position | SELECT | 1kULp | |
| Career Stage | SELECT | SCLTv | |
| Looking For | SELECT | VzOte | |
| Income | SELECT | iwraT | |

### Fields still to add to Users:
- Heritage (MULTI_SELECT)
- Generation (FORMULA from Birthday)
- First Language (SINGLE_LINE_TEXT)
- Regional Accent (SELECT)
