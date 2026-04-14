# Creator Scans — Softr Database Schema Reference

> Regenerated from live Softr API on 2026-04-14. Source of truth for table, field, and option IDs.
> Field names are case-sensitive; IDs are stable.

## Database: Content Tracking App
**ID:** `11fb1760-0482-40fb-be23-52537f179e3f`  
**Tables:** 25

### Table directory

- **Users** — `yZSKdACWobx3KB`
- **Creator Dashboard** — `pDZdDmwgLdfYqQ`
- **Commitments** — `zBwbenj5YzAfwt`
- **Leaderboard** — `nbdHJnIXRRLPPj`
- **Tracker** — `N2b8pe79SbbWkF`
- **Cohorts** — `PkFrHKtivoFLYQ`
- **Content** — `AU7Wswx4IMlDKL`
- **Submissions** — `GXpUQp4vi0Ehat`
- **Community** — `SadFvv6IiLmnjP`
- **Referals** — `Z1PzDBgb8ujXTu`
- **Chats** — `EE4b3jRSWljoZy`
- **Messages** — `3IKwoe8TjFDY7C`
- **Rewards** — `PkYypHzsw9tj9G`
- **Memberships** — `fUc4b5zgZYDhNH`
- **Notifications** — `EBMZO0Dv9AksBO`
- **Course** — `FhDJfPPcLJEKHT`
- **Lessons** — `gFW6PZeT2JHVCk`
- **Events** — `tfAkfTmkZCkEUr`
- **Requests** — `YQUWwF67rXGgtR`
- **Brands** — `DqAtvmhge23QvA`
- **Products** — `zJPuKZNjMXTqUU`
- **Videos** — `dk40PsHx4tsnIi`
- **Script** — `ct0pnjOpnV7oy8`
- **Storyboard/Script** — `moJabgXWJZmGeK`
- **Lesson Completions** — `hsDFWXx7nTzEAn`

---

## Users
**Table ID:** `yZSKdACWobx3KB`  
**Field count:** 103

| Field | Type | ID | Options / Notes |
|-------|------|----|-----------------|
| Email | EMAIL | T3cFq |  |
| User ID | RECORD_ID | 9Vfxf |  |
| Full Name | SINGLE_LINE_TEXT | PXdkq |  |
| Avatar | ATTACHMENT | 8L9hV | multi |
| First Name | FORMULA | RSQKY | `IF(FIND(" ", {Full Name}) = 0, {Full Name}, LEFT({Full Name}, FIND(" ", {Full Name}) - 1))` |
| Last Name | FORMULA | 55uQh | `RIGHT({Full Name}, LEN({Full Name}) - FIND(" ", {Full Name}))` |
| TikTok Username | SINGLE_LINE_TEXT | uZ8z0 |  |
| Shop bound? | CHECKBOX | bTOzJ |  |
| LIVE bound? | CHECKBOX | sZ3R2 |  |
| Bio | LONG_TEXT | on8OZ |  |
| Tagline | SINGLE_LINE_TEXT | v2Gu1 |  |
| My Goal | LONG_TEXT | uNdfV |  |
| City | SINGLE_LINE_TEXT | z4TF1 |  |
| TikTok Profile URL | FORMULA | f2AHE | `"https://www.tiktok.com/@" & {TikTok Username}` |
| TikTok Logo | URL | ENEGR |  |
| User Group | SELECT | l8nWy | Creator (`7d6b0fc6-3027-49f0-bc1f-6cfd3510409c`); Pro (`39051ba0-bda0-4a96-83c3-88a3bf4bd959`); Affiliate (`8cf755f6-0d53-4a59-a6fe-540d42b5d293`) |
| Status | SELECT | M5XgY | Pending (`645c06e7-c7b5-43e9-8cf3-55c6deed5ddc`); Approved (`33b889ec-3b84-4905-a253-d3f86e278e47`); Active (`174b4cb9-6d2e-4c95-834d-3f329764596b`); Paused (`6d8229d0-dda0-400e-a7fd-ec2da623e5ba`); Banned (`87e57363-36f3-4b67-9010-60b564886b0a`) |
| join_date | DATETIME | T8GMb |  |
| Last Seen | DATETIME | qAAQl |  |
| Cohorts | LINKED_RECORD | peglF | → Cohorts (multi) |
| Commitments | LINKED_RECORD | 6D0Fb | → Commitments |
| warning_status (Commitments) | LOOKUP | qAR6g | lookup Commitments.warning_status |
| Memberships | LINKED_RECORD | PxOWN | → Memberships (multi) |
| Track Type (Memberships) | LOOKUP | caTol | lookup Memberships.Track Type |
| Shop Posts Per Week (Memberships) | ROLLUP | InJBl | rollup Memberships.Posts Per Week |
| Organic Posts Per Week (Memberships) | ROLLUP | 2df2s | rollup Memberships.Posts Per Week |
| Lives Per Week (Memberships) | ROLLUP | dUmad | rollup Memberships.Lives Per Week |
| Reward List (Memberships) | LOOKUP | J3sl4 | lookup Memberships.Reward List |
| Content | LINKED_RECORD | Hk3MM | → Content (multi) |
| Submissions | LINKED_RECORD | PkvCK | → Submissions (multi) |
| Likes (Community) | LINKED_RECORD | a3NS1 | → Community (multi) |
| Leaderboard | LINKED_RECORD | WzwWY | → Leaderboard (multi) |
| level_message (Leaderboard) | LOOKUP | frzB6 | lookup Leaderboard.level_message |
| level (Leaderboard) | LOOKUP | 1c1aR | lookup Leaderboard.level |
| current_level (Leaderboard) | LOOKUP | Azewq | lookup Leaderboard.current_level |
| level_name (Leaderboard) | LOOKUP | 1PyHV | lookup Leaderboard.level_name |
| Referrals | LINKED_RECORD | 4Rn9R | → Referals |
| Last 30 days | ROLLUP | X5K39 | rollup Referals.totalEarned |
| Life Time | ROLLUP | VAaex | rollup Referals.totalEarned |
| Traker | LINKED_RECORD | bOjFY | → Tracker (multi) |
| points_earned (Traker) | LOOKUP | fgr0q | lookup Tracker.points_earned |
| Community | LINKED_RECORD | hF5FO | → Community (multi) |
| Chats (Participant 1 -user) | LINKED_RECORD | 1PT9v | → Chats (multi) |
| Chats (Participant 2 - member) | LINKED_RECORD | kWiUr | → Chats (multi) |
| Messages Sent | LINKED_RECORD | ijxrf | → Messages (multi) |
| Location Formula | FORMULA | LyYtK | `"<i class='fa-solid fa-location-dot'></i>  " & {City}` |
| Joined Date Formula | FORMULA | AzIku | `"<i class='fa-regular fa-calendar'></i>  Joined " & DATETIME_FORMAT({join_date}, 'MMM D...` |
| Active Status | FORMULA | UR7HM | `IF(   DATETIME_DIFF(NOW(), {Last Seen}, 'minutes') <= 5,   "🟢  Online now",   "<i class...` |
| Track | SELECT | QbvGk | multi; TikTok Shop (`b272a5a6-b463-4f0e-aabb-8c231bb5e0e3`); TikTok Lives (`43a33905-ce96-43b1-adca-381d5bb530b9`); Organic Posts (`c882b6ac-ec17-400b-bdc0-05344400fcd9`) |
| Confirmation | CHECKBOX | AU0vv |  |
| Monthly Payment Link | FORMULA | NENYw | `"https://buy.stripe.com/6oU3cv0h93u1fVKdQIbsc07?locked_prefilled_email=" & SUBSTITUTE({...` |
| Annual Payment Link | FORMULA | bqT69 | `"https://buy.stripe.com/28E00jfc3fcJfVKeUMbsc08?locked_prefilled_email=" & SUBSTITUTE({...` |
| Monthly Membership | SINGLE_LINE_TEXT | 6JwII |  |
| Annual Membership | SINGLE_LINE_TEXT | IduFS |  |
| Features List | LONG_TEXT | sryHl |  |
| Membership Description | LONG_TEXT | JmpRN |  |
| Monthly | SINGLE_LINE_TEXT | FviUj |  |
| Annual | SINGLE_LINE_TEXT | MvwOy |  |
| logo | URL | rDG3V |  |
| icon | URL | qzzmL |  |
| affiliate_id | SINGLE_LINE_TEXT | vPPOT |  |
| affiliate_user_id | SINGLE_LINE_TEXT | gWC0L |  |
| affiliate_program_id | SINGLE_LINE_TEXT | FQIHI |  |
| link | SINGLE_LINE_TEXT | 3NYSQ |  |
| affiliate_link | FORMULA | lLV7p | `"https://www.creatorscans.com/?ref=" & {link}` |
| affiliate_button | FORMULA | 0nqMS | `'<sl-copy-button value="' & {affiliate_link} & '" copy-label="Copy Link" success-label=...` |
| numberOfReferredUsers | SINGLE_LINE_TEXT | 5GRiI |  |
| numberOfClicks | SINGLE_LINE_TEXT | rpjk8 |  |
| totalCommissionEarned | NUMBER | QiVGE |  |
| totalRevenue | NUMBER | FyaLv |  |
| Month/Year | FORMULA | vQ6PA | `DATETIME_FORMAT({join_date}, "MMMM yyyy")` |
| Notifications 1 | LINKED_RECORD | 3OtRb | → Notifications (multi) |
| Events | LINKED_RECORD | ijLQc | → Events (multi) |
| Requests | LINKED_RECORD | 7mre8 | → Requests (multi) |
| Pending Requests | ROLLUP | PrTLP | rollup Requests.Notes |
| Request Outstanding | FORMULA | fiR7D | `"<div style='display: flex; align-items: center; gap: 8px;'><span style='font-size: 32p...` |
| Age | SELECT | aNbbk | 18-24 (`7c18b135-14c3-4495-b16e-95b72d3e0cbc`); 25-34 (`5b2a810b-00f7-4858-88db-6d0c423d646b`); 35-44 (`52f19f78-b5fb-40ce-be37-6328d3cd01c8`); 45-54 (`78b01971-c8c5-40fe-8d82-f28f87d2b3bb`); 55+ (`eadfa9ad-457b-438a-9ffd-c49141be5aa8`) |
| Pronouns | SELECT | W933n | She (`7c923ac9-29b6-4f43-9bdd-26c41f3d4a87`); Her (`4561af4c-a1db-4d5b-8f8c-dbf4f138cc58`); He (`3bad761c-42fa-48f4-ac62-6dbfd01c4871`); Him (`6ea6a342-d2a1-43cc-ba97-0623e98b4310`); They (`b4a5a067-6f04-461b-8f5e-f08055c27f04`); Them (`d767bc88-9aca-4983-9e45-5a2bdaaa069c`) |
| Gender | SELECT | ZrMCm | Female (`dbf0be9b-2b73-4e0a-b27d-cdaff23f70ce`); Male (`5734272f-f846-47fb-a3b8-e594e24570aa`) |
| Address | LONG_TEXT | ONDAV |  |
| Birthday | DATETIME | A79E9 |  |
| Generation | FORMULA | UiS1H | `IF({Birthday} = BLANK(), "", IF(YEAR({Birthday}) >= 1997, "Gen Z", IF(YEAR({Birthday}) ...` |
| Job Title | SINGLE_LINE_TEXT | 6aChZ |  |
| Industry | SELECT | aDyIX | multi; Accounting And Planning (`0260ea52-40b5-4898-957c-2e276655145d`); Arts And Craft (`7659a4b6-6efb-4934-b279-c8a58d16334a`); Automotive (`04a57bc8-52de-4a4b-a77d-69faa2026a22`); Beauty (`a1aedefc-a2aa-4687-ae7c-0a2f0c0de99b`); Computer Software (`4cff0323-af2a-44c8-b081-634f22664344`); Design (`0a26a96b-56a3-4e7a-a30c-ca2ccf16a382`); Education (`e17f4caa-1506-40b2-8ec4-272097a201b6`); Entertainment (`20bf6bd4-8040-417e-9843-f5a80060ca7b`); E-commerce (`037e81c8-ae23-4316-8229-fd989e284f56`); Fashion (`a42b6950-0ec5-4940-bb5d-a8f022852329`); Financial Services (`5a02167f-df51-40ef-b081-c612c3d5a650`); Food And Beverages (`bf0e24dc-b884-445f-b8a0-0c44c8472068`); Government (`27c25c4b-2bf7-4e8e-baa1-f0c003ad1d49`); Health Wellness And Fitness (`0b130df3-1c9f-4236-b58e-93a8d17361c8`); Health Care (`26624cfc-05a0-4ddf-a60a-56a39a89716b`); Higher Education (`09d94ce4-2090-42d1-9981-62a8fe000416`); Hospitality (`e89be7df-a3a3-4ea3-a872-b78ae9e3eaa9`); Law (`1041a3f0-6b73-4ce4-9af5-51255beb6eb6`); Marketing And Advertising (`282149f5-c076-4543-93b7-a372a1fa387e`); Media (`33445e27-00d3-48c7-a0a1-e40a9a56a76d`); Music (`dd093db3-21bb-4e86-9d7b-42a636d26e90`); Pharmaceuticals (`67df71f7-1c1c-4fd8-8830-26e7df958230`); Photography (`15e2a081-482d-4472-87c1-825d63d4801b`); Public Relations And Communications (`6041f7d0-4ba3-45ca-878e-1e91b2fcd52c`); Real Estate (`7d1284da-3352-4fc1-b2d3-6ec2b3896eca`); Research (`048ca458-68dd-4c0b-a632-e3b19b19018a`); Retail (`cc1af1e2-177e-4e52-ba48-97133c00b78c`); Social Services (`878f1467-5208-4121-9b14-9ee08c927d10`); Technology (`fc7af4e6-e449-4198-9927-bc26e0e3be81`); Transport (`644d47ae-7b52-4b66-be4c-6b4f742dc92c`); The Arts (`f52e3d85-2d82-4db2-92ec-f3c318dee8dc`) |
| Position | SELECT | 1kULp | multi; Student (`e12b6edf-a034-4f1f-9b57-8bf1365c96fe`); Graduate (`6d6f0ec4-1285-44bc-b04e-bd7b0f8f47a4`); First job (`0ee3900c-360f-47b9-a206-1499bae874f1`); Supervisor (`8944af77-ed1f-4403-bb9e-135c208eb302`); Manager (`f3c40a91-41c4-440f-aa66-ec449b8c9805`); Senior Manger (`1d625b39-64a0-4691-9364-45c4cfd1f511`); Head of (`4fc7573a-bfb3-4536-9b4d-459b01ca4a2b`); Senior VP (`5f0f2d85-049e-410d-b131-38cce71cfc85`); VP (`a4632697-b6eb-4290-a6e9-7b3d9eaa41a7`); Director (`45a84956-7172-4d87-b436-5af2bd2ecff0`); C-suite (`680dee7f-0238-456f-9f80-a0229cea544d`); Founder (`4a949d72-2be2-4aa8-8b2a-18be58636ccb`); Sabbatical (`afaf7396-03bc-47a5-8c6e-3d0cb566f60f`); Freelancer (`5a511959-7173-4e28-9e61-ce1a341a1f5b`); Transitioning (`baca5e2b-58f8-4e88-9e25-42b8489be512`); Not applicable (`8d750b5e-14ac-4299-84bb-06969f84c929`); CEO of my household (`32537df4-045b-4528-8d7a-1329964cb55f`); Self-employed (`4910924a-223c-40a5-9007-f0348a8b20e1`) |
| Career Stage | SELECT | SCLTv | multi; Studying (`3f2aa006-da2e-43ac-93db-81cfde7bec31`); Full-time employed (`a6a812f8-2144-4d19-98e8-f268e64cabc6`); Part-time employed (`18d6cf21-0d1f-4620-a85f-9c08104b6ef2`); Self-employed (`58c5b479-e873-4391-9a78-c691b253483f`); Unemployed (`a1c40bda-48fa-42e1-9b67-82ee93c6410e`); Starting a new role (`2cbb3480-7637-4682-b8b6-6b5ee88507ca`); Developing in my current role (`0bc39f84-52c4-4226-bf00-c837c0b8512d`); Exploring new opportunities (`2ad2256d-5568-4ee1-8611-0b5d03b1ac78`); Starting a business (`e1ad3525-26ed-488b-94d9-ced7896a7f16`); Starting a side hustle (`25b04f85-801d-464d-8da9-3661c8e31d13`); Scaling a business (`08ffdc9f-0830-4686-81e5-6e8e8f6cb3ad`); Scaling a side hustle (`e2176bab-d596-49d7-a07e-70f576ca7fdb`); On parental leave (`3f9bdc26-30ce-437d-9af4-a1c3b59e6d04`); Retired (`dc5767b6-c0da-4548-b5a8-e0f543939fe1`) |
| Looking For | SELECT | VzOte | multi; Extra income (`d050142d-44af-4494-9099-c23c0ea9c43b`); Full-time creator income (`b45719a7-bc03-4289-a662-e37481ecf758`); Build my personal brand (`1ff90485-4c20-4dea-aa84-6187a34a142f`); Grow my audience (`01f039b3-eb72-44cc-945c-044a90a4fc48`); Learn content creation (`3a714e9e-5a86-4ca4-9dde-813b779e69d8`); Promote my own business (`eed51b53-c58d-44ab-898b-eb1666ba09f4`); Promote my own products (`c832ae69-090d-41e8-aacf-a7905b38fd97`); Find brand deals (`9945f80d-ea69-4aec-9196-931a5ea6afa5`); Build a community (`a880fa43-b543-48d2-b80b-b70a0c0dc46a`); Have fun / creative outlet (`7c2a657f-1ca0-4b44-8844-f92f2ffeb8c5`); Career change into content (`990387b2-a454-444f-aed5-aba93a440394`); Network with other creators (`4356406e-efc8-49c7-a39b-0b785a1ce60c`); Content coaching & feedback (`54b60926-7bd3-4e7f-a0a2-083586c334a2`); Help with bans & violations (`6c8aa18c-4552-48c2-b7e6-bf00510a1ae8`); Content creation education (`d80dcd57-5df0-4952-a41a-7dc7958ef927`); AI for content creation (`9b1bd238-1886-4591-a98c-c6a22b4f7a31`); Content planning & strategy (`61f552f7-5944-4422-8fd1-724a631f6b5a`); Community & accountability (`3a587a02-60fc-4dfc-9c7b-df89024816b2`) |
| Income | SELECT | iwraT | multi; Not applicable (`8902e9bd-6a8b-4586-a7cd-9c07d7e80ebb`); Up to £12,500 (`318de1ca-4056-47b4-a381-42345864283f`); £12,501 to £29,999 (`3a06a5f3-4aec-47fa-87db-ff0165dc0dcd`); £30,000 to £49,999 (`0f575015-7acf-49eb-8892-9a91e8ce71ee`); £50,000 to £69,999 (`358165e3-287d-4ecd-8d01-24ddbbc12129`); £70,000 to £89,999 (`b54baa1c-5769-4cd1-b622-d622fa659843`); £90,000 to £109,999 (`997e66b2-dcf1-4bb6-8bf1-44d73be52575`); £110,000 to £150,000 (`c4c88d25-a76b-4589-9bcd-be462f6031a9`); Over £150,000 (`2e1a0248-a495-4d9c-b2ea-cba5f07f0b49`); £70 (`fef37746-3681-4b9d-be0c-7b0b30558145`); 000 to £89 (`0dffa936-0c62-44ac-9096-2ca5282c40cf`); 999 (`cae8b3c0-d1af-4640-bfd4-751102b2e8d5`) |
| Ethnic Background | SELECT | iXpQB | English, Welsh, Scottish, Northern Irish or British (`a7083d76-bfda-432d-9593-7f488ce42d2c`); Irish (`810b705b-21f1-45f6-b83f-36d95df51b5d`); Gypsy or Irish Traveller (`e3610b6b-f99a-459f-b74b-c93b8122f80f`); Roma (`192afb67-f348-4455-8d9a-c3c23b43074a`); Any other White background (`21e47c28-4f08-4883-9443-1c71b13aa554`); White and Black Caribbean (`edf2ffd2-1976-4943-8245-35e9964433ae`); White and Black African (`2c73786e-d8d4-4411-a160-af74f9cb319a`); White and Asian (`049b8489-dfb8-4a17-9bad-64a48608de68`); Any other Mixed or Multiple background (`08b3fe1c-991b-4abe-beab-4cf349124d84`); Indian (`0a1b6e63-3602-4507-84b9-4b1fc462672e`); Pakistani (`fd6b5dee-3c75-4fee-8ed3-cb9a4cee279f`); Bangladeshi (`4eb6435b-5998-49a8-884c-d7e649983f93`); Chinese (`77daa23c-4cad-4fad-8c98-88f4272291ee`); Any other Asian background (`230b38d0-8e51-4836-9d37-def8f65714f5`); African (`1ce67a46-e904-4823-893f-e6da609c9daa`); Caribbean (`ed0b88ce-e4eb-42ae-b8b6-05788bb96fd7`); Any other Black, Black British or Caribbean background (`ef20d76d-b830-4f74-96b0-e2aad95912d4`); Arab (`5171a811-72ed-4fbd-af2f-c4422fe2ea18`); Any other ethnic group (`bd2f7f5a-6fad-4b36-91af-60b41933a1e3`) |
| Heritage | SINGLE_LINE_TEXT | FzvXF |  |
| Regional Accent | SELECT | TV7Nz | London / South East (`f36ac53b-e31a-4ee1-a40a-fd17a0001754`); Midlands (`d35b42ac-f606-431d-a97b-6b61fb3203c7`); North West (`f7c13297-d00e-4f12-9c1a-1cc2262e91e9`); North East (`a35d5e8a-c00e-4494-ac5e-e12129e8842c`); Yorkshire (`00372359-9b6a-4d07-97ad-a973a07aad2a`); Scottish (`8c6a285c-eceb-45eb-8fa0-b2b8f55eeaf6`); Welsh (`a24a3812-a9ad-4476-9366-be0d489463f9`); Northern Irish (`3f0ddb59-b9c9-4a01-89a8-722125ef34b4`); Other (`7cd041dd-dd06-4128-a650-376ea9edd022`) |
| First Language | SINGLE_LINE_TEXT | 3hJpt |  |
| Local Dialect | CHECKBOX | aWNgr |  |
| Script | LINKED_RECORD | NEzjo | → Script (multi) |
| total_ai_credits | ROLLUP | 424JY | rollup Script.Concept Name |
| ai_used_multiplier | FORMULA | 9uxFY | `{total_ai_credits}*10` |
| Creator Dashboard | LINKED_RECORD | 01ger | → Creator Dashboard (multi) |
| Followers | LOOKUP | wMXX0 | lookup Creator Dashboard.Followers |
| active_months | FORMULA | sFJim | `DATETIME_DIFF(TODAY(), {join_date}, 'months')` |
| cycle_start | FORMULA | plMBT | `DATEADD({join_date}, {active_months}, 'month')` |
| cycle_end | FORMULA | 0D4ds | `DATEADD({join_date}, {active_months} + 1, 'month')` |
| current billing cycle | FORMULA | xO029 | `AND(   {join_date} >= ({cycle_start}),   {join_date} < ({cycle_end}) )` |
| Lesson Completions | LINKED_RECORD | 70l4m | → Lesson Completions (multi) |

## Creator Dashboard
**Table ID:** `pDZdDmwgLdfYqQ`  
**Field count:** 70

| Field | Type | ID | Options / Notes |
|-------|------|----|-----------------|
| Handle | SINGLE_LINE_TEXT | DJMLR |  |
| Profile picture  | ATTACHMENT | nFIab | multi |
| User | LINKED_RECORD | Pr920 | → Users (multi) |
| Display name | SINGLE_LINE_TEXT | 9SavF |  |
| Growth status | SELECT | L1M19 | Fast growing (`ab32f63c-0823-485d-b1d2-1c2d9ef5f517`) |
| Categories | SINGLE_LINE_TEXT | Ci9Dy |  |
| Followers | SINGLE_LINE_TEXT | gqVJd |  |
| Mcn | SINGLE_LINE_TEXT | mzaQa |  |
| Bio | SINGLE_LINE_TEXT | friU2 |  |
| Email | EMAIL | 3gPXC |  |
| Profile link | URL | iC0yC |  |
| Data period | SELECT | FTDIY | Feb 27 - Mar 29 2026 (`421efb3d-8561-44a5-ab9c-96ffa68c5488`); Feb 28 - Mar 30 2026 (`70f3f0c3-815d-4f81-b784-a50e088ba5b8`); Mar 1 - Mar 31 2026 (`1922059a-30ed-4892-8ff5-e02358c0a9ac`) |
| GMV | CURRENCY | 6Pw9a |  |
| Gmv (£) | SINGLE_LINE_TEXT | NLHCM |  |
| Items sold | SINGLE_LINE_TEXT | IPbnP |  |
| Gpm (£) | CURRENCY | 8IWZg |  |
| Gmv per customer (£) | CURRENCY | 7Yuy3 |  |
| Gmv sales channel - video (%) | SINGLE_LINE_TEXT | qFLyS |  |
| Gmv sales channel - product cards (%) | SINGLE_LINE_TEXT | s8G3N |  |
| Gmv category 1 | SINGLE_LINE_TEXT | knvSu |  |
| Gmv category 1 (%) | SINGLE_LINE_TEXT | FClT0 |  |
| Gmv category 2 | SINGLE_LINE_TEXT | oRtSw |  |
| Gmv category 2 (%) | SINGLE_LINE_TEXT | JapTN |  |
| Gmv category 3 | SINGLE_LINE_TEXT | qjDJt |  |
| Gmv category 3 (%) | SINGLE_LINE_TEXT | vMPmx |  |
| Gmv category 4 | SINGLE_LINE_TEXT | XnKZU |  |
| Gmv category 4 (%) | SINGLE_LINE_TEXT | LP7x8 |  |
| AVCR% | PERCENT | XEsCT |  |
| Avg commission rate (%) | SINGLE_LINE_TEXT | tDShS |  |
| Products | NUMBER | qZQWl |  |
| Brand collaborations | NUMBER | QbPaf |  |
| Product price (£) | SINGLE_LINE_TEXT | DrU4d |  |
| Video gpm (£) | CURRENCY | pX3Mi |  |
| Videos | NUMBER | j29Kz |  |
| Avg video views | NUMBER | irsqY |  |
| Avg video engagement (%) | SINGLE_LINE_TEXT | 7MZyr |  |
| Live gpm (£) | CURRENCY | flKa9 |  |
| Live streams | NUMBER | hkfxc |  |
| Avg live views | SINGLE_LINE_TEXT | Lklp6 |  |
| Avg live engagement (%) | SINGLE_LINE_TEXT | FsKSB |  |
| Female (%) | SINGLE_LINE_TEXT | 8oWzb |  |
| Male (%) | SINGLE_LINE_TEXT | B1cDT |  |
| Age 18-24 (%) | SINGLE_LINE_TEXT | iLAHe |  |
| Age 25-34 (%) | SINGLE_LINE_TEXT | IwCFt |  |
| Age 35-44 (%) | SINGLE_LINE_TEXT | LCYcc |  |
| Age 45-54 (%) | SINGLE_LINE_TEXT | xVm1S |  |
| Age 55+ (%) | SINGLE_LINE_TEXT | SSUan |  |
| Top location 1 | SELECT | AgvYQ | England (`ec434726-3529-4e5c-956e-7325b5eb411b`) |
| Top location 2 | SELECT | Pim79 | Scotland (`87334656-c8d7-4a4a-9fed-5597cc3ba746`); Ile de France (`5699ed2d-9710-4a33-95dd-cefb281eb0fa`); North Rhine Westphalia (`3413381e-006d-4690-982d-20ccbe9c200b`); Other (`bbfd6d8b-315d-4ab5-a804-7e368ba26d09`); Lombardy (`2b5c1070-b2fa-40fb-bd13-e72533d44e06`) |
| Top location 3 | SINGLE_LINE_TEXT | ovoWe |  |
| Top location 4 | SINGLE_LINE_TEXT | pRBW1 |  |
| Top location 5 | SINGLE_LINE_TEXT | ObraO |  |
| Video with product 1 title | SINGLE_LINE_TEXT | HCuNG |  |
| Video with product 1 views | SINGLE_LINE_TEXT | zpc2Z |  |
| Video with product 1 likes | SINGLE_LINE_TEXT | fI0hf |  |
| Video with product 1 release date | DATETIME | MIIdr |  |
| Video with product 1 url | URL | mXL9B |  |
| Video with product 2 title | SINGLE_LINE_TEXT | OVfPs |  |
| Video with product 2 views | SINGLE_LINE_TEXT | FMDto |  |
| Video with product 2 likes | SINGLE_LINE_TEXT | ABf4A |  |
| Video with product 2 release date | DATETIME | xD56W |  |
| Video with product 2 url | URL | LhwgP |  |
| Video with product 3 title | SINGLE_LINE_TEXT | BiO4j |  |
| Video with product 3 views | SINGLE_LINE_TEXT | VLtCq |  |
| Video with product 3 likes | SINGLE_LINE_TEXT | siEfP |  |
| Video with product 3 release date | DATETIME | Te4lu |  |
| Video with product 3 url | URL | 1cqH6 |  |
| Pay | FORMULA | bhHsh | `{GMV}*{AVCR%}` |
| CS_Comms% | PERCENT | 3lfkw |  |
| CS_Margin | FORMULA | pgEyX | `{Pay}*{CS_Comms%}` |

## Commitments
**Table ID:** `zBwbenj5YzAfwt`  
**Field count:** 62

| Field | Type | ID | Options / Notes |
|-------|------|----|-----------------|
| Member | FORMULA | 2hNt4 | `{Name (Users)} & "'s Tracker"` |
| user | LINKED_RECORD | 7Mlae | → Users |
| total_ai_credits (Users) | LOOKUP | wqJ3n | lookup Users.ai_used_multiplier |
| Submissions | LINKED_RECORD | uOvbq | → Submissions (multi) |
| Name (Users) | LOOKUP | OZt9d | lookup Users.First Name |
| membership | LOOKUP | IuCeA | lookup Users.Memberships |
| join_date | LOOKUP | ijYPw | lookup Users.join_date |
| weekly_live_target | LOOKUP | 6Dax4 | lookup Users.Lives Per Week (Memberships) |
| weekly_shop_target | LOOKUP | 3vrSz | lookup Users.Shop Posts Per Week (Memberships) |
| weekly_organic_target | LOOKUP | ciAoc | lookup Users.Organic Posts Per Week (Memberships) |
| days_on_platform | FORMULA | 74ZgN | `DATETIME_DIFF(TODAY(), {join_date}, 'days')` |
| weeks_on_platform | FORMULA | gN6Os | `FLOOR({days_on_platform} / 7)` |
| current_week_start | FORMULA | xoheV | `DATEADD({join_date}, {weeks_on_platform} * 7, 'days')` |
| current_week_end | FORMULA | Ku8nk | `DATEADD({current_week_start}, 6, 'days')` |
| days_to_week_end | FORMULA | sz0al | `DATETIME_DIFF({current_week_end}, TODAY(), 'days')` |
| is_current_week | FORMULA | G9M5R | `IF(AND(TODAY() >= {current_week_start}, TODAY() <= {current_week_end}), 'TRUE', 'FALSE')` |
| current_month_start | FORMULA | PrWBB | `DATEADD({join_date}, FLOOR({days_on_platform} / 30) * 30, 'days')` |
| current_month_end | FORMULA | ZkmPJ | `DATEADD({current_month_start}, 29, 'days')` |
| days_to_month_end | FORMULA | QM7ix | `DATETIME_DIFF({current_month_end}, TODAY(), 'days')` |
| shop_completed_this_week | ROLLUP | UARou | rollup Submissions.Name |
| shop_completed_this_month | ROLLUP | Cu2ts | rollup Submissions.Name |
| shop_completed_this_year | ROLLUP | uhoPT | rollup Submissions.Name |
| shop_completed_this_quater | ROLLUP | STTtg | rollup Submissions.Name |
| live_completed_this_week | ROLLUP | eeAd3 | rollup Submissions.Name |
| live_completed_this_month | ROLLUP | LyH4H | rollup Submissions.Name |
| live_completed_this_year | ROLLUP | N9LSj | rollup Submissions.Name |
| live_completed_this_quarter | ROLLUP | qFeZn | rollup Submissions.Name |
| organic_completed_this_week | ROLLUP | 9RWQS | rollup Submissions.Name |
| organic_completed_this_month | ROLLUP | INzUK | rollup Submissions.Name |
| organic_completed_this_year | ROLLUP | Z1Z16 | rollup Submissions.Name |
| organic_completed_this_quarter | ROLLUP | OM34H | rollup Submissions.Name |
| shop_remaining | FORMULA | HDK5G | `IF({weekly_shop_target} > 0, MAX(0, {weekly_shop_target} - {shop_completed_this_week}), 0)` |
| live_remaining | FORMULA | FI6ZG | `IF({weekly_live_target} > 0, MAX(0, {weekly_live_target} - {live_completed_this_week}), 0)` |
| organic_remaining | FORMULA | JqBcT | `IF({weekly_organic_target} > 0, MAX(0, {weekly_organic_target} - {organic_completed_thi...` |
| weekly_consistency_shop | FORMULA | 8wyiA | `IF({weekly_shop_target} > 0, ROUND((IF({shop_completed_this_week}, {shop_completed_this...` |
| weekly_consistency_live | FORMULA | sWQuR | `IF({weekly_live_target} > 0, ROUND((IF({live_completed_this_week}, {live_completed_this...` |
| weekly_consistency_organic | FORMULA | lVtEc | `IF({weekly_organic_target} > 0, ROUND((IF({organic_completed_this_week}, {organic_compl...` |
| weekly_consistency_score (overall) | FORMULA | X2btC | `ROUND(   (     {weekly_consistency_shop} +      {weekly_consistency_live} +      {weekl...` |
| Traker | LINKED_RECORD | vTa0P | → Tracker (multi) |
| alltime_consistency_score | ROLLUP | vWCFm | rollup Tracker.weekly_consistency_score |
| monthly_consistency_score | ROLLUP | i4Sqv | rollup Tracker.weekly_consistency_score |
| Leaderboard | LINKED_RECORD | ALcR5 | → Leaderboard (multi) |
| week_passed | FORMULA | X2D5W | `IF(   OR(     {weekly_consistency_score (overall)} >= 100,     AND({shop_remaining} <= ...` |
| weeks_below_threshold | NUMBER | pQtJ0 |  |
| warning_status | SELECT | de4EX | warned (`dab3fa30-f296-47bd-8c0f-7d00f0aa9ee9`); cooldown (`37fc511f-c9f8-4514-aa75-a455f0f9f5e7`); pending_downgrade (`0ec223a3-43cb-4397-a2e0-6c83715bdc46`) |
| Record ID | RECORD_ID | t7qVt |  |
| posts_this_year | FORMULA | WSW3t | `{shop_completed_this_year}+{organic_completed_this_year}` |
| Posting Streak | FORMULA | U4k88 | `"<div style='display: flex; align-items: center; gap: 8px;'><span style='font-size: 32p...` |
| Live Streak | FORMULA | QFVZf | `"<div style='display: flex; align-items: center; gap: 8px;'><span style='font-size: 32p...` |
| posts_target | FORMULA | h9xV4 | `{weekly_shop_target}+{weekly_organic_target}` |
| posts_this_week | FORMULA | MeEqL | `{shop_completed_this_week}+{organic_completed_this_week}` |
| Post Tank | FORMULA | Brcjo | `"<div style='display: flex; flex-direction: column; gap: 8px;'><div style='display: fle...` |
| Live Tank | FORMULA | wqO9d | `"<div style='display: flex; flex-direction: column; gap: 8px;'><div style='display: fle...` |
| Consistency score | FORMULA | xWw7K | `"<div style='display: flex; flex-direction: column; gap: 8px;'><div style='display: fle...` |
| Notifications | LINKED_RECORD | uHBVx | → Notifications (multi) |
| active_months | FORMULA | V4Yat | `DATETIME_DIFF(TODAY(), {join_date}, 'months')` |
| cycle_start | FORMULA | Q6mRf | `DATEADD({join_date}, {active_months}, 'month')` |
| cycle_end | FORMULA | fUxkf | `DATEADD({join_date}, {active_months} + 1, 'month')` |
| current_billing_cycle | FORMULA | uuTel | `AND(   DATE(NOW()) >= DATE({cycle_start}),   DATE(NOW()) <= DATE({cycle_end}) )` |
| ai_credits | NUMBER | N3laD |  |
| ai_credits_remaining | FORMULA | AFACw | `{ai_credits}-{total_ai_credits (Users)}` |
| credits_remaining_bar | FORMULA | CANUm | `CONCATENATE("<sl-progress-bar value='", IF({ai_credits} > 0, ROUND((({total_ai_credits ...` |

## Leaderboard
**Table ID:** `nbdHJnIXRRLPPj`  
**Field count:** 33

| Field | Type | ID | Options / Notes |
|-------|------|----|-----------------|
| Name | FORMULA | A0cV6 | `{Full Name (Users)} & "'s Rank"` |
| User | LINKED_RECORD | 8wxGy | → Users |
| Avatar (Users) | LOOKUP | GT2F6 | lookup Users.Avatar |
| Cohorts (Users) | LOOKUP | usNkn | lookup Users.Cohorts |
| Commitments | LINKED_RECORD | 9R3ZV | → Commitments (multi) |
| Tracker | LINKED_RECORD | sdaS9 | → Tracker (multi) |
| weeks_passed_true | ROLLUP | S9G6t | rollup Tracker.week_passed |
| weeks_passed_false | ROLLUP | NE4pB | rollup Tracker.week_passed |
| Full Name (Users) | LOOKUP | wi8j2 | lookup Users.Full Name |
| total_points | ROLLUP | T8wE1 | rollup Users.points_earned (Traker) |
| weekly_points_earned | ROLLUP | B9W22 | rollup Tracker.points_earned |
| id | RECORD_ID | MQl5R |  |
| monthly_points_earned | ROLLUP | cJX3K | rollup Tracker.points_earned |
| current_level | FORMULA | bqUo0 | `IF({total_points} < 50, 1, IF({total_points} < 150, 2, IF({total_points} < 400, 3, IF({...` |
| level_name | FORMULA | 0XGsC | `SWITCH({current_level}, 1, "Starter", 2, "Committed", 3, "Consistent", 4, "Dedicated", ...` |
| points_to_next_level | FORMULA | qN7hs | `SWITCH({current_level},   1, 50 - {total_points},   2, 150 - {total_points},   3, 400 -...` |
| level_message | FORMULA | TiClo | `IF({current_level} < 9,   {points_to_next_level} & " points to Level " & ({current_leve...` |
| weekly_consistency_score (overall) (Commitments) | LOOKUP | TrJVE | lookup Commitments.weekly_consistency_score (overall) |
| alltime_consistency_score (Commitments) | LOOKUP | oJuDu | lookup Commitments.alltime_consistency_score |
| monthly_consistency_score 14 (Commitments) | LOOKUP | nQ5ft | lookup Commitments.monthly_consistency_score |
| weekly_rank | NUMBER | 1kFYT |  |
| monthly_rank | NUMBER | 5VkSU |  |
| alltime_rank | NUMBER | 745jp |  |
| cohort_rank | NUMBER | 1nBen |  |
| Last updated Ranks | UPDATED_AT | Pp1I9 |  |
| Last updated | UPDATED_AT | XkOPP |  |
| current_streak_weeks | FORMULA | jQhgX | `IF(   DATETIME_DIFF(NOW(), {last_false_date}, 'days') <= 7,   0,   {weeks_passed_true} )` |
| last_false_date | UPDATED_AT | 5K1nn |  |
| level | FORMULA | KjlG2 | `"Level " & {current_level} & " \| " & {level_name} & " Creator"` |
| trophy (weekly) | FORMULA | 15FTF | `IF(   {weekly_rank} = 1,   "https://res.cloudinary.com/dmrekfwpj/image/upload/v17670304...` |
| trophy (monthly) | FORMULA | FANtx | `IF(   {monthly_rank} = 1,   "https://res.cloudinary.com/dmrekfwpj/image/upload/v1767030...` |
| trophy (all-time) | FORMULA | 0ngIW | `IF(   {alltime_rank} = 1,   "https://res.cloudinary.com/dmrekfwpj/image/upload/v1767030...` |
| Notifications | LINKED_RECORD | tlmZ3 | → Notifications (multi) |

## Tracker
**Table ID:** `N2b8pe79SbbWkF`  
**Field count:** 31

| Field | Type | ID | Options / Notes |
|-------|------|----|-----------------|
| Created | CREATED_AT | 7TRw8 |  |
| User | LINKED_RECORD | gyCjA | → Users (multi) |
| Commitments | LINKED_RECORD | TKWrr | → Commitments (multi) |
| organic_remaining | LOOKUP | zYFqh | lookup Commitments.organic_remaining |
| shop_remaining | LOOKUP | MQm9W | lookup Commitments.shop_remaining |
| live_remaining | LOOKUP | TeW8Z | lookup Commitments.live_remaining |
| Leaderboard | LINKED_RECORD | kJkL4 | → Leaderboard (multi) |
| weekly_consistency_score | LOOKUP | aznvY | lookup Commitments.weekly_consistency_score (overall) |
| days_on_platform (Commitments) | LOOKUP | FrTNw | lookup Commitments.days_on_platform |
| current_week_end (Commitments) | LOOKUP | s57QY | lookup Commitments.current_week_end |
| shop_completed_this_week (Commitments) | LOOKUP | KpIGZ | lookup Commitments.shop_completed_this_week |
| weekly_shop_target (Commitments) | LOOKUP | wbeCq | lookup Commitments.weekly_shop_target |
| current_week_start (Commitments) | LOOKUP | 8gMQN | lookup Commitments.current_week_start |
| live_completed_this_week (Commitments) | LOOKUP | 7HUbp | lookup Commitments.live_completed_this_week |
| weekly_live_target (Commitments) | LOOKUP | C4IFl | lookup Commitments.weekly_live_target |
| weeks_on_platform (Commitments) | LOOKUP | TvQvV | lookup Commitments.weeks_on_platform |
| organic_completed_this_week (Commitments) | LOOKUP | 2nEd8 | lookup Commitments.organic_completed_this_week |
| weekly_organic_target (Commitments) | LOOKUP | XJMUv | lookup Commitments.weekly_organic_target |
| oops_used_shop | CHECKBOX | 4jdte |  |
| oops_used_live | CHECKBOX | Ebz1Q |  |
| oops_used_organic | CHECKBOX | tU9Jt |  |
| week_passed | FORMULA | U6NPF | `IF(   OR(     {weekly_consistency_score} >= 100,     AND({shop_remaining} <= 1, {live_r...` |
| points_earned | FORMULA | EGCd3 | `IF(   {weekly_consistency_score} > 0,   2 + IF({weekly_consistency_score} >= 100, 10,  ...` |
| posts_this_week | FORMULA | jBO1R | `{shop_completed_this_week (Commitments)}+{organic_completed_this_week (Commitments)}` |
| Posting Streak | FORMULA | RVM5u | `"<div style='display: flex; align-items: center; gap: 8px;'><span style='font-size: 32p...` |
| Live Streak | FORMULA | Gtt50 | `"<div style='display: flex; align-items: center; gap: 8px;'><span style='font-size: 32p...` |
| posts_target | FORMULA | r43ln | `{weekly_shop_target (Commitments)}+{weekly_organic_target (Commitments)}` |
| post tank | FORMULA | g1T3r | `"<div style='display: flex; flex-direction: column; gap: 8px;'><div style='display: fle...` |
| live tank | FORMULA | f6jLk | `"<div style='display: flex; flex-direction: column; gap: 8px;'><div style='display: fle...` |
| consistency score | FORMULA | XMad0 | `"<div style='display: flex; flex-direction: column; gap: 8px;'><div style='display: fle...` |
| Notifications | LINKED_RECORD | l3HsA | → Notifications (multi) |

## Cohorts
**Table ID:** `PkFrHKtivoFLYQ`  
**Field count:** 5

| Field | Type | ID | Options / Notes |
|-------|------|----|-----------------|
| Name | FORMULA | OPrMR | `DATETIME_FORMAT({Month/Year}, "MMMM yyyy")` |
| Month/Year | DATETIME | cVks1 |  |
| Members | LINKED_RECORD | Se8IL | → Users (multi) |
| Member Count | ROLLUP | HXV9E | rollup Users.Email |
| Leaderboard | LINKED_RECORD | cHD5R | → Leaderboard (multi) |

## Content
**Table ID:** `AU7Wswx4IMlDKL`  
**Field count:** 17

| Field | Type | ID | Options / Notes |
|-------|------|----|-----------------|
| Name | FORMULA | KY1S2 | `UPPER(LEFT({Content Type}, 1)) & MID({Content Type}, 2, LEN({Content Type})) & " " & {N...` |
| User | LINKED_RECORD | rDhk0 | → Users (multi) |
| Bio (Users) | LOOKUP | 39hhF | lookup Users.Bio |
| Memberships (Users) | LOOKUP | bS7GF | lookup Users.Memberships |
| Posts Per Week (Memberships) (Users) | LOOKUP | Zi2L6 | lookup Users.Shop Posts Per Week (Memberships) |
| Lives Per Week (Memberships) (Users) | LOOKUP | Jr6NZ | lookup Users.Lives Per Week (Memberships) |
| Content Type | SELECT | 7oDYF | Shop (`0943d81e-00d8-4d49-8732-d28075d3341a`); Live (`46360011-a5d5-4090-8a5d-5964ca10acbb`); Organic (`1cef4794-0c44-4a1b-aa2a-a6382d96ca2f`) |
| Number | NUMBER | zzMoz |  |
| Scheduled Date | DATETIME | hbfDE |  |
| Scheduled End | FORMULA | UFLWy | `{Scheduled Date}` |
| Completed | CHECKBOX | 07UbR |  |
| Title | SINGLE_LINE_TEXT | Y3LEa |  |
| Description | LONG_TEXT | dHAW3 |  |
| Commitment | LINKED_RECORD | ZbGMs | → Commitments |
| Submissions | LINKED_RECORD | JXTc7 | → Submissions (multi) |
| Thumbnail (Submissions) | LOOKUP | xC9ko | lookup Submissions.Thumbnail |
| Status | SELECT | QN0YD | Drafts (`9c3f3d6a-5625-49a7-b00b-9210f7e8c7e7`); Scheduled (`10aad779-94e0-4ac2-a346-7dcd9eb0a480`); Published (`3b14b52a-5204-46b3-a550-b7bbb7a388bc`) |

## Submissions
**Table ID:** `GXpUQp4vi0Ehat`  
**Field count:** 85

| Field | Type | ID | Options / Notes |
|-------|------|----|-----------------|
| Name | SINGLE_LINE_TEXT | GwAn0 |  |
| User | LINKED_RECORD | eKO5X | → Users |
| Generation (Users) | LOOKUP | nPYdF | lookup Users.Generation |
| Gender (Users) | LOOKUP | ZFzvW | lookup Users.Gender |
| level_name (Leaderboard) (Users) | LOOKUP | mtt2o | lookup Users.level_name (Leaderboard) |
| Lives Per Week (Memberships) (Users) | LOOKUP | pVnfF | lookup Users.Lives Per Week (Memberships) |
| Full Name (Users) | LOOKUP | W3EuF | lookup Users.Full Name |
| Content | LINKED_RECORD | VlY9t | → Content (multi) |
| Title (Content) | LOOKUP | H4bgb | lookup Content.Title |
| TikTok Username (Users) | LOOKUP | YXLQJ | lookup Users.TikTok Username |
| user_join_date | LOOKUP | r6aDP | lookup Users.join_date |
| Thumbnail | URL | HRzLx |  |
| Content Type | LOOKUP | kVe6e | lookup Content.Content Type |
| Commitments | LINKED_RECORD | 9ZmVq | → Commitments (multi) |
| type | SELECT | SdfUb | Upload (`194f7207-9999-479c-8bf6-4b9a00cfefe4`); Link (`0d718896-790d-4009-9002-68e450a860d2`) |
| LIVE Snippet | ATTACHMENT | IAX6v |  |
| TikTok Link | URL | RfwZB |  |
| submission_date | DATETIME | 9XJcX |  |
| AI Verified | CHECKBOX | 3EqzW |  |
| Verification Status | SELECT | rH0BA | Pending (`2b4c1f8f-09da-4564-a971-ec78f248de49`); Approved (`b36897a9-6fee-42fd-b521-4e5095c4b9e5`); Rejected (`7b5f8579-2ea3-4478-81cd-b9666d4e1532`); Verified (`e3de6afb-2557-4388-9fb3-e93de8221c1e`) |
| AI Feedback | LONG_TEXT | Dc4bV |  |
| user_current_month_start | LOOKUP | EVjuM | lookup Commitments.current_month_start |
| user_current_month_end | LOOKUP | jLjYl | lookup Commitments.current_month_end |
| user_current_week_end | LOOKUP | Z61zj | lookup Commitments.current_week_end |
| user_current_week_start | LOOKUP | ZFnTy | lookup Commitments.current_week_start |
| Content Type (user) | SELECT | hlttH | TikTok Live (`bf3a1fae-d949-4702-bf53-3f29c1b93911`); TikTok Shop (`9136dd82-eefa-4f23-a06e-61f167b010e1`); TikTok Organic (`939d2168-8b50-41a7-972f-f11adc2fcd42`) |
| is_current_week | FORMULA | P5rF8 | `IF(AND({submission_date} >= {user_current_week_start}, {submission_date} <= {user_curre...` |
| is_current_month | FORMULA | gki2w | `IF(AND({submission_date} >= {user_current_month_start}, {submission_date} <= {user_curr...` |
| submission_year | FORMULA | aYQ9i | `YEAR({submission_date})` |
| current_year | FORMULA | eprw1 | `YEAR(TODAY())` |
| is_current_year | FORMULA | rBIoJ | `IF({submission_year} = {current_year}, 'TRUE', 'FALSE')` |
| submission_quarter | FORMULA | iq6Ey | `"Q" & CEILING(MONTH({submission_date})/3)` |
| current_quarter | FORMULA | 5sITQ | `"Q" & CEILING(MONTH(TODAY())/3)` |
| is_current_quarter | FORMULA | kLVGP | `IF(AND({submission_year} = {current_year}, {submission_quarter} = {current_quarter}), '...` |
| status | SELECT | m6sls | Drafts (`6f97de78-8589-41d8-8a59-46d94ce9ef40`); Scheduled (`a1bbfeea-100d-49aa-af80-b357cb8d3299`); Published (`59a43b1f-02f4-4586-9d1b-0fb219c610ec`); Pending (`a91c7796-5ace-41e5-83c8-4751f0935e69`) |
| Record ID | RECORD_ID | N0L2B |  |
| viewer_count | NUMBER | 1oFCp |  |
| username_verified | CHECKBOX | 4WTvq |  |
| backstage_verified | CHECKBOX | iBMSh |  |
| discrepancy_notes | LONG_TEXT | A5R9J |  |
| ai_confidence_score | NUMBER | R3ljb |  |
| rejection_reason | SINGLE_LINE_TEXT | tnbXM |  |
| ai_suggested_action | LONG_TEXT | 5IIQ6 |  |
| needs_manual_review | CHECKBOX | x2Y8u |  |
| submission_quality | SELECT | fH5mR | Excellent (`43014701-ab20-4bb8-9067-d76a4da89a9a`); Good (`07652635-a6bc-4004-9048-b58129d5e8a8`); Acceptable (`efc56925-029d-417b-9097-1cd3ec14575a`); Poor (`5b4aa95d-db8b-44f9-91ef-b94710aa77aa`) |
| tiktok_video_id | SINGLE_LINE_TEXT | X472y |  |
| video_url | URL | QlI91 |  |
| author_avatar_url | URL | 4mz9G |  |
| post_caption | LONG_TEXT | NTZ2z |  |
| video_duration_seconds | DURATION | KWuA8 |  |
| posted_date | DATETIME | TukEy |  |
| view_count | NUMBER | 8plX4 |  |
| like_count | NUMBER | pA490 |  |
| comment_count | NUMBER | YXta6 |  |
| share_count | NUMBER | zpCYm |  |
| save_count | NUMBER | Npett |  |
| music_title | SINGLE_LINE_TEXT | gBZe4 |  |
| music_artist | SINGLE_LINE_TEXT | kjvtC |  |
| content_summary | LONG_TEXT | rPWbj |  |
| Icon | FORMULA | geORt | `IF(   OR(     {Content Type} = "Shop",     {Content Type} = "Organic"   ),   "https://r...` |
| loading code | LONG_TEXT | 8Xq9X |  |
| display | FORMULA | vLqlh | `IF(   AND({status} = "Pending", {video_url} = "", {Thumbnail} = ""),   {loading code}, ...` |
| rating | FORMULA | wMctE | `IF(   {submission_quality} = "Excellent", 5,   IF(     {submission_quality} = "Good", 4...` |
| Notifications 1 | LINKED_RECORD | OUfbj | → Notifications (multi) |
| overall_score | NUMBER | rpttg |  |
| metrics_analysis | LONG_TEXT | uYc3n |  |
| product_identified | SINGLE_LINE_TEXT | UAT8o |  |
| content_type_observed | SINGLE_LINE_TEXT | Pvie6 |  |
| phase_identified | SINGLE_LINE_TEXT | jEccI |  |
| score_1 | NUMBER | Brdkr |  |
| score_1_comment | LONG_TEXT | zOaUh |  |
| score_2 | NUMBER | MHlTe |  |
| score_2_comment | LONG_TEXT | KvbCC |  |
| score_3 | NUMBER | oWIVk |  |
| score_3_comment | LONG_TEXT | Dox4P |  |
| score_4 | NUMBER | FRo0s |  |
| score_4_comment | LONG_TEXT | G8pgh |  |
| score_5 | NUMBER | lQW0g |  |
| score_5_comment | LONG_TEXT | 1txfB |  |
| score_6 | NUMBER | VoMyU |  |
| score_6_comment | LONG_TEXT | P69IN |  |
| score_7 | NUMBER | Zdp5Y |  |
| score_7_comment | LONG_TEXT | 7ZyrP |  |
| LIVE | SELECT | EfKfJ | Regular (`ff2babdb-23e9-4ffa-b051-c22717cef358`); Shoppable (`609e5bd2-e2d0-4dd1-8ff0-1083a7ab78fa`) |
| Phase | SINGLE_LINE_TEXT | b2p1B |  |

## Community
**Table ID:** `SadFvv6IiLmnjP`  
**Field count:** 15

| Field | Type | ID | Options / Notes |
|-------|------|----|-----------------|
| Post Text | LONG_TEXT | IOSSa |  |
| Post ID | RECORD_ID | YqUer |  |
| Post Title | LONG_TEXT | xESUe |  |
| Post Date | DATETIME | kfLWK |  |
| Type | SELECT | wgn8T | Comment (`bba89545-51a4-4557-bd17-00939399a110`); Post (`706351ed-c1b2-4311-a5b1-9fb8b63ec5f5`) |
| Tag | SELECT | ptpwq | 💰 Opportunities (`38ebc791-ecdd-4220-b6fb-6a1d8cd2684b`); 💬 Chat (`07cdd3df-dffe-4393-9de8-7387dd62e9eb`); 🚨Updates (`485278b2-1797-4893-bb96-3bb82137b109`); 👑 Wins (`4ca09fcb-ea2c-4f3e-8224-9c69cf10b7a1`) |
| Attachment | ATTACHMENT | M4zVL |  |
| Link | URL | ssJwh |  |
| Likes Count | ROLLUP | Yf6E2 | rollup Users.Email |
| Likes (User) | LINKED_RECORD | uGBkk | → Users (multi) |
| Likes Full Name (Users) | LOOKUP | G7yAZ | lookup Users.Full Name |
| User | LINKED_RECORD | JkWRN | → Users |
| Author Full Name (Users) | LOOKUP | oJAki | lookup Users.Full Name |
| Author Avatar (Users) | LOOKUP | 0CpPA | lookup Users.Avatar |
| Engagement | FORMULA | l3xWP | `"<i class='fa-regular fa-thumbs-up'></i> " & {Likes Count} & "  <i class='fa-regular fa...` |

## Referals
**Table ID:** `Z1PzDBgb8ujXTu`  
**Field count:** 14

| Field | Type | ID | Options / Notes |
|-------|------|----|-----------------|
| Internal_referral_id | RECORD_ID | TWD0C |  |
| User | LINKED_RECORD | qWNYM | → Users |
| affiliate_id (Users) | LOOKUP | S1xpN | lookup Users.affiliate_id |
| Email (Users) | LOOKUP | Xc9cM | lookup Users.Email |
| sale_id | SINGLE_LINE_TEXT | bd4JG |  |
| affiliate_id | SINGLE_LINE_TEXT | HiuFw |  |
| referral_Id | SINGLE_LINE_TEXT | msUWF |  |
| external_Id | SINGLE_LINE_TEXT | nSMqW |  |
| externalInvoice_Id | SINGLE_LINE_TEXT | o7Rpe |  |
| customer_name | SINGLE_LINE_TEXT | eThFt |  |
| custom_email | EMAIL | HSPzd |  |
| totalEarned | NUMBER | xhW1D |  |
| commissionRate | NUMBER | bGklx |  |
| createdAt | DATETIME | OlmhK |  |

## Chats
**Table ID:** `EE4b3jRSWljoZy`  
**Field count:** 16

| Field | Type | ID | Options / Notes |
|-------|------|----|-----------------|
| Chat ID | RECORD_ID | UlvMc |  |
| Last Message Date | DATETIME | gX6eq |  |
| Created Date | DATETIME | HG4V4 |  |
| Participant 1 (User) | LINKED_RECORD | JBxNV | → Users (multi) |
| Participant 1 First Name (Users) | LOOKUP | YjCTR | lookup Users.First Name |
| Participant 1 \| Full Name (Users) | LOOKUP | UDfeB | lookup Users.Full Name |
| Participant 1 Avatar (Users) | LOOKUP | e404s | lookup Users.Avatar |
| Participant 2 (Member) | LINKED_RECORD | AL6aa | → Users (multi) |
| Location (Users) | LOOKUP | PLmVD | lookup Users.City |
| Last Seen (Users) | LOOKUP | 7Kaph | lookup Users.Last Seen |
| Participant 2 Full Name (Users) | LOOKUP | G8fOe | lookup Users.Full Name |
| Participant 2 First Name (Users) | LOOKUP | xBpsW | lookup Users.First Name |
| Participant 2 Avatar (Users) | LOOKUP | HpgUJ | lookup Users.Avatar |
| Messages | LINKED_RECORD | 7i9yw | → Messages (multi) |
| Messages Text | LOOKUP | fn8bd | lookup Messages.Message Text |
| Last Message Text | LONG_TEXT | cZSe9 |  |

## Messages
**Table ID:** `3IKwoe8TjFDY7C`  
**Field count:** 11

| Field | Type | ID | Options / Notes |
|-------|------|----|-----------------|
| Message ID | RECORD_ID | XK2Sw |  |
| Message Text | LONG_TEXT | dghfe |  |
| Sent Date | DATETIME | 2pOhm |  |
| Read Status | CHECKBOX | YJ2wp |  |
| Chat | LINKED_RECORD | sznRJ | → Chats (multi) |
| Sender | LINKED_RECORD | wS3Zg | → Users (multi) |
| Full Name (Users) | LOOKUP | SZ1ea | lookup Users.Full Name |
| Avatar (Users) | LOOKUP | kBZyW | lookup Users.Avatar |
| First Name (Users) | LOOKUP | k8WMY | lookup Users.First Name |
| Participant 1 (User) (Chats) | LOOKUP | 2WwEk | lookup Chats.Participant 1 (User) |
| Participant 2 (Member) (Chats) | LOOKUP | 2rzLb | lookup Chats.Participant 2 (Member) |

## Rewards
**Table ID:** `PkYypHzsw9tj9G`  
**Field count:** 7

| Field | Type | ID | Options / Notes |
|-------|------|----|-----------------|
| Reward Name | SINGLE_LINE_TEXT | qTjaH |  |
| Status | SELECT | VJPjd | Active (`b41d17a3-01ac-482d-9b0d-fbe8344f6401`); Inactive (`147b8e2b-77b4-46bb-a543-40091a1378da`); Pause (`45005d27-4841-4975-8c70-dfd85f1ab258`) |
| Notes | LONG_TEXT | 9DDxs |  |
| Reward Type | SELECT | zFc3x | multi; shop (`b13e209b-c969-4cbc-ae19-37afec4c9ad4`); live (`3e791c8f-1b49-4031-959a-ef4151b299d1`); all (`2015bd70-1981-4a25-9eba-e40a318e4f46`); organic (`4f5f0bf9-6131-4b99-b501-235e9630476c`) |
| Tier Required | SELECT | Wg7S4 | Starter (`0c5e7391-34ce-495f-8a47-82d3d6490da9`); Pro (`d9373168-595a-41ad-82d6-eebcb9bff4d1`); Advanced (`0a789f6e-4667-4004-900c-92a58a49b055`); custom (`58e7c22b-84c1-4050-a0b5-a4ffaeba83d2`) |
| Description | LONG_TEXT | l1Nab |  |
| Memberships | LINKED_RECORD | KJe2f | → Memberships (multi) |

## Memberships
**Table ID:** `fUc4b5zgZYDhNH`  
**Field count:** 9

| Field | Type | ID | Options / Notes |
|-------|------|----|-----------------|
| Membership Name | FORMULA | yZbhV | `UPPER(LEFT({Track Type}, 1)) & MID({Track Type}, 2, LEN({Track Type})) & " " & UPPER(LE...` |
| Track Type | SELECT | cxm7q | Shop (`336ec709-8e8b-4682-987d-64d68cd7adbc`); Live (`f93109ee-4c99-4a91-829e-9ad09e145956`); Organic (`fb3cfd46-591f-49e1-a377-d4dfef279a88`) |
| Tier | SELECT | 21LDd | Starter (`e8812629-fe19-4030-afd2-49cde46f3fb6`); Pro (`97d97d97-ee66-431b-a4cd-4f7f913118af`); Advanced (`de6306fe-9033-484c-b0c2-cbdf8f55efee`); Custom (`03420e8e-b8a9-43c8-9200-c953f729e9ab`) |
| Posts Per Week | NUMBER | M16Ja |  |
| Lives Per Week | NUMBER | OY4r9 |  |
| Description | LONG_TEXT | opoZk |  |
| Features List | LONG_TEXT | eKe5z |  |
| Reward List | LINKED_RECORD | MyO2s | → Rewards (multi) |
| Users | LINKED_RECORD | HpOES | → Users (multi) |

## Notifications
**Table ID:** `EBMZO0Dv9AksBO`  
**Field count:** 30

| Field | Type | ID | Options / Notes |
|-------|------|----|-----------------|
| Id | RECORD_ID | jhj9V |  |
| created_at | CREATED_AT | sNX2D |  |
| logo | URL | aOvXZ |  |
| notification_type | SELECT | 2maET | Welcome (`728bd421-0ae3-400d-af8b-0789650cade4`); Content verified (`8d30e6fc-93a0-437e-b20e-ee61b0e734c5`); Content rejected (`9ed71292-d4e5-4cd7-9408-57827f71d210`); Content approved (`bf2b1528-3c24-4b51-8540-1c30e509c9ac`); Streak milestone (`d2f73b04-aee6-420d-9972-8818c509a5c4`); Warning issued (`a807d1a5-c7a7-4a23-8239-1ffc56260ff7`); Tier change (`64bef2b0-9fd0-4f0e-b83a-c38a03bb7de3`); Shop invite (`163efd88-b5a4-4f7d-8c5b-08e0f1461c88`); LIVE invite (`fb740968-48b6-4873-aa38-3b4635fbe226`); System update (`fbee1409-f42c-4f4f-893c-ff6fd61460bf`) |
| Title | FORMULA | OvP8C | `IF(   {notification_type} = "System update",   {system_update_title},   SWITCH(     {no...` |
| Message | FORMULA | wBTg3 | `IF({notification_type} = "System update", {system_update_message},    SWITCH({notificat...` |
| first_name (users) | LOOKUP | 1AOcX | lookup Users.First Name |
| system_update_message | LONG_TEXT | nZHpg |  |
| system_update_title | SINGLE_LINE_TEXT | pVGDf |  |
| Is_read | CHECKBOX | rPeiN |  |
| status | FORMULA | P8dSI | `IF(   {Is_read} = 'true',   "🟢",   "🔴" )` |
| updated_at | UPDATED_AT | omemr |  |
| Friendly_time | FORMULA | W876L | `IF(   DATETIME_DIFF(NOW(), {created_at}, 'minutes') < 1,     'just now',   IF(     DATE...` |
| users | LINKED_RECORD | N7eaQ | → Users (multi) |
| email (users) | LOOKUP | EhbBp | lookup Users.Email |
| submissions | LINKED_RECORD | ZoApu | → Submissions (multi) |
| rejection_reason | LOOKUP | ioojx | lookup Submissions.rejection_reason |
| submission_date | LOOKUP | CGmAh | lookup Submissions.submission_date |
| content_type | LOOKUP | Ptwbo | lookup Submissions.Content Type (user) |
| ai_feedback | LOOKUP | zOo2R | lookup Submissions.AI Feedback |
| commitments | LINKED_RECORD | VnPrw | → Commitments (multi) |
| warning_status | LOOKUP | mQzNh | lookup Commitments.warning_status |
| warning_status_message | LONG_TEXT | iihrg |  |
| tracker | LINKED_RECORD | DRii9 | → Tracker (multi) |
| organic_remaining | LOOKUP | aOZGA | lookup Tracker.organic_remaining |
| shop_remaining | LOOKUP | ZBcw1 | lookup Tracker.shop_remaining |
| live_remaining | LOOKUP | y61U1 | lookup Tracker.live_remaining |
| live_streak | LOOKUP | 5Kx6s | lookup Tracker.Live Streak |
| posting_streak | LOOKUP | Zuu66 | lookup Tracker.Posting Streak |
| weekly_consistency_score | LOOKUP | zeyxU | lookup Tracker.weekly_consistency_score |

## Course
**Table ID:** `FhDJfPPcLJEKHT`  
**Field count:** 16

| Field | Type | ID | Options / Notes |
|-------|------|----|-----------------|
| Name | SINGLE_LINE_TEXT | 4e8yM |  |
| Thumbnail | URL | hLsGv |  |
| type | URL | NR4ip |  |
| About This Course | LONG_TEXT | ck1JJ |  |
| What You'll Learn | LONG_TEXT | 63H4g |  |
| Duration | SINGLE_LINE_TEXT | VB4oU |  |
| Category | SELECT | jXSnc | LIVE (`8a552a88-ccd7-4edb-b83e-77d9de9b056f`); SHOP (`8248a326-916a-4da9-88c0-f34bf93d4dc2`); ORGANIC (`52fe73f9-d4d3-42e7-bdc9-de2801734609`); PLATFORM (`1de7508f-b6a3-492d-9da0-4e9868364abb`) |
| Difficulty | SELECT | 5khor | Beginner (`36dc2141-63b8-4fdc-8e3b-629f753406ba`); Intermediate (`ac599540-013c-40f8-a611-3c3d47f9862a`); Advanced (`9a1d5f02-317f-4c5c-bfdf-a86a13f77a12`); Expert (`d204f4f6-cabb-418b-9ab7-e9a16522734e`) |
| Lessons | LINKED_RECORD | TlDOR | → Lessons (multi) |
| Number of lessons | ROLLUP | DiFh2 | rollup Lessons.Name |
| lessons tag | SINGLE_LINE_TEXT | 7yIGk |  |
| 1st Lesson URL | SINGLE_LINE_TEXT | sqSYJ |  |
| Host | ATTACHMENT | BoJCO | multi |
| Host name | SINGLE_LINE_TEXT | DqLWF |  |
| Overview | LONG_TEXT | f32JB |  |
| Lesson Completions | LINKED_RECORD | HuH3o | → Lesson Completions (multi) |

## Lessons
**Table ID:** `gFW6PZeT2JHVCk`  
**Field count:** 21

| Field | Type | ID | Options / Notes |
|-------|------|----|-----------------|
| Name | SINGLE_LINE_TEXT | 4e8yM |  |
| Lesson Number | SINGLE_LINE_TEXT | 42btG |  |
| Category | SELECT | jXSnc | LIVE (`8a552a88-ccd7-4edb-b83e-77d9de9b056f`); SHOP (`8248a326-916a-4da9-88c0-f34bf93d4dc2`); ORGANIC (`52fe73f9-d4d3-42e7-bdc9-de2801734609`); PLATFORM (`1de7508f-b6a3-492d-9da0-4e9868364abb`) |
| Difficulty | SELECT | 5khor | Beginner (`36dc2141-63b8-4fdc-8e3b-629f753406ba`); Intermediate (`ac599540-013c-40f8-a611-3c3d47f9862a`); Advanced (`9a1d5f02-317f-4c5c-bfdf-a86a13f77a12`); Expert (`d204f4f6-cabb-418b-9ab7-e9a16522734e`) |
| Course | LINKED_RECORD | v5YZr | → Course (multi) |
| Event | LINKED_RECORD | aV8hT | → Events (multi) |
| Recoding URL (Events) | LOOKUP | 32lc4 | lookup Events.Recoding URL |
| Description | LONG_TEXT | ck1JJ |  |
| Intro | URL | 19iD8 |  |
| Icon | URL | 1yMSz |  |
| Thumbnail | URL | C0izX |  |
| Duration | SINGLE_LINE_TEXT | VB4oU |  |
| Lesson Outline | LONG_TEXT | i8yPC |  |
| Lesson | LONG_TEXT | 0wTBQ |  |
| Explainer | URL | DqSLD |  |
| Podcast | ATTACHMENT | uU6oS |  |
| Slides | ATTACHMENT | nINLz |  |
| Record ID | RECORD_ID | jvoYu |  |
| Next ID | SINGLE_LINE_TEXT | DESfb |  |
| Next Lesson | FORMULA | ZKKVg | `"/lessons-details?recordId=" & {Next ID}` |
| Lesson Completions | LINKED_RECORD | NlCfN | → Lesson Completions (multi) |

## Events
**Table ID:** `tfAkfTmkZCkEUr`  
**Field count:** 24

| Field | Type | ID | Options / Notes |
|-------|------|----|-----------------|
| Title | SINGLE_LINE_TEXT | yKIjC |  |
| Description | LOOKUP | qyFYF | lookup Lessons.Description |
| Lessons | LINKED_RECORD | coDjP | → Lessons (multi) |
| Category (Lessons) | LOOKUP | kmPSX | lookup Lessons.Category |
| Icon (Lessons) | LOOKUP | 1z0gB | lookup Lessons.Icon |
| Thumbnail (Lessons) | LOOKUP | NM73N | lookup Lessons.Thumbnail |
| Date | DATETIME | Rasrd |  |
| End | DATETIME | iLJCh |  |
| Start Time | SINGLE_LINE_TEXT | Eeicr |  |
| End Time | SINGLE_LINE_TEXT | ctYKS |  |
| Zone | SINGLE_LINE_TEXT | fvXaS |  |
| Date and Time | FORMULA | k5giO | `DATETIME_FORMAT({Date}, 'eee dd MMM yyyy') & ' at ' & {Start Time} & ' - ' & {End Time}...` |
| Details | LONG_TEXT | ChsAu |  |
| Event | SELECT | Ori2L | LIVE (`92d32796-abe7-46f7-b84e-e8f4647d6747`); Meeting (`1c800b14-c112-400c-a723-4e5f68e33160`); IRL (`c9ee1b08-bacd-4e78-852e-463861cc4523`) |
| Platform | SELECT | WFsaT | multi; YouTube (`efc6b2e6-0570-44e9-a473-029b6984624a`); TikTok (`6a4fe5c5-d995-4e59-b12e-545d065d55f9`); LinkedIn (`2ed55263-d29a-4c5b-9382-232bc7e9d0e6`); Google (`87b0692c-5665-4536-bf09-2e7c4d0a488d`) |
| Location | SINGLE_LINE_TEXT | IN60v |  |
| Cost | SINGLE_LINE_TEXT | wYEOS |  |
| iCal | FORMULA | Myvzk | `'data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0ADTSTART...` |
| Google cal | FORMULA | 8ngQ4 | `'https://calendar.google.com/calendar/render?action=TEMPLATE&text=' & SUBSTITUTE({Title...` |
| Recoding URL | URL | PC5Vx |  |
| Hosted by | SINGLE_LINE_TEXT | 7A6er |  |
| User | LINKED_RECORD | wcnJq | → Users (multi) |
| Attendees | ROLLUP | W3IIp | rollup Users.Email |
| Current | FORMULA | mFFJR | `{Date} > NOW()` |

## Requests
**Table ID:** `YQUWwF67rXGgtR`  
**Field count:** 16

| Field | Type | ID | Options / Notes |
|-------|------|----|-----------------|
| Notes | LONG_TEXT | cy26q |  |
| Type | SELECT | 5GA3J | Bug (`f19aab50-5f36-4f76-b5e5-d2e802a899f6`); Suggestion (`15665c3c-700a-4f60-b6b2-f45b3aa44866`); Praise (`eafdeb5d-167e-4201-8734-5f799a34b11b`); Support (`7b4f93a8-a67a-4d98-9d5b-9d0e9afc86b5`) |
| Icon | FORMULA | mg4lD | `IF({Request} = "Product sample request", "https://res.cloudinary.com/dmrekfwpj/image/up...` |
| Screenshot | ATTACHMENT | JawzO |  |
| URL | URL | F9w1N |  |
| Full name | LOOKUP | RglZy | lookup Users.Full Name |
| First name | LOOKUP | ViX4Z | lookup Users.First Name |
| Last name | LOOKUP | 89rr6 | lookup Users.Last Name |
| Email | LINKED_RECORD | 0GTuv | → Users (multi) |
| Request | SELECT | zPHQj | Payment/billing question (`312273f5-b900-4a5b-b71f-7b61b18fb56f`); Product sample request (`2a592633-d568-437b-b709-fde9d6c1ce5e`); Platform technical issue (`f2fed91e-0f60-4edd-b756-a7b641f3e7e3`); Violation/ban support (`b2326429-2879-425c-bb35-5a8580e4c661`); Commission rate check (`524d2715-5117-499e-8e21-0cf611e9489e`) |
| Sentiment | FORMULA | NVIXX | `SWITCH({Type}, 'Bug report', 'Negative', 'Praise', 'Positive', 'Suggestion', 'Unknown',...` |
| Priority | FORMULA | t02Vn | `SWITCH({Type}, 'Bug report', 'High', 'Praise', 'Low', 'Medium')` |
| Status | SELECT | QoxNq | New (`7ba10cf6-68fd-4d0c-a8eb-5b08b1f99984`); Resolved (`cac149d8-58b8-466f-b90d-d2e8931c0f4f`); In progress (`9141fa68-4480-4322-a3e9-4571ffdc7f3e`) |
| Created at | CREATED_AT | qebKD |  |
| Last updated at | UPDATED_AT | wI0oD |  |
| Response | LONG_TEXT | JRkff |  |

## Brands
**Table ID:** `DqAtvmhge23QvA`  
**Field count:** 23

| Field | Type | ID | Options / Notes |
|-------|------|----|-----------------|
| Brand name | SINGLE_LINE_TEXT | eLXLv |  |
| Social1 | URL | NJtkV |  |
| 30 days | FORMULA | Odf8V | `{Social1} & "&days=30"` |
| Shop ID | FORMULA | wQsIT | `SUBSTITUTE({Social1}, "https://www.social1.ai/products?shopId=", "")` |
| Logo | FORMULA | dcFge | `"https://social-listening-images.s3.us-east-2.amazonaws.com/shops/" & {Shop ID} & ".jpg"` |
| Industry | SELECT | leTMr | Beauty (`46f54ae3-9823-4b3f-970e-71c005c77e38`); Fashion & Apparel (`1d2990c1-c4bb-4083-a52c-34085db5d5c9`); General Retail (`e39a31e0-84c3-4070-918f-8ded6f34614d`); Fashion (`b3a02475-61a7-4e68-9af2-83891a6c4bae`); Fashion & Beauty (`db300c12-25a4-46ad-8afa-3aabe78b155d`); Wellness (`83fa2018-f942-43e3-9b2c-72ad5bb3a54c`); Health & Wellness (`20954fb3-0dba-40a4-8fda-8e96810d3a4e`); Luxury Confectionery (`ff2c2c17-a6f9-44f3-a511-b599d0d34e39`); Home & Living (`ed0f9df5-959c-4394-8fb5-d0c2f195bb52`); Home Appliances (`4122b06b-b649-4939-a65d-89edb5760913`); Health & Personal Care (`26c44647-28e3-4187-aff9-178a1351b04f`); Home Decor (`9a849c93-b70f-432f-b8e0-0ca7fc8af5de`); Beauty & Personal Care (`bfc25cf7-0110-44a1-ae27-ab518c310b42`); Home Care (`2011fa50-0809-4d7e-bcb2-fe17e99e2e4b`); Beverage / Wellness (`94d27bcf-b651-4a23-8cf8-e2654fedfad6`); Beverage (`37485bc3-5e3e-4d59-a30d-b7132a0416d6`); Consumer Electronics (`6d5b90f8-bda6-4933-9c89-55b9630b57e5`); Health & Fitness (`c3c44d99-9941-48b4-97de-5e38a8747575`); Apparel & Footwear (`18d94435-122a-48d6-9836-cc9f07f78ce8`); Apparel & Fashion (`2bd5782d-bbb7-4c68-94ea-f3c69c87162a`); Household Goods (`281251e3-68fd-455a-9404-dd45d14e133f`); Food & Beverage (`7014c98a-040a-4432-aa36-331cffed8e12`); Apparel & Accessories (`08da1116-1bb3-4208-acbf-f8154786bbf5`) |
| Category | SELECT | PMVcv | multi; Alternative Medications & Treatments (`54742e2a-1a33-46c1-b3eb-09664d79bb05`); Amber (`5f19070b-ca9f-42c2-a8ad-0475c115f384`); Artificial Gemstones (`39620008-d5c7-40d4-a58b-c7ff4430c5cd`); Audio & Video (`79fb7db8-771c-4084-9481-b2c9687ca1d1`); Automotive & Motorcycle (`70e9fe82-eb7d-46a5-8fc4-086ed598f409`); Baby & Maternity (`f2c60709-ed46-42f6-8af9-0aa83b688ed3`); Baby Care & Health (`e03b6182-b1ad-472d-9193-2ace2f45c3a7`); Baby Clothing & Shoes (`57735fcd-bd0c-4e66-8443-8d84aaefd4de`); Baby Fashion Accessories (`90fb2731-fd94-497f-bef8-b5fb5a6686a3`); Baby Furniture (`e721f54b-307e-4ba7-b4a2-9a01f2dd3b4d`); Baby Safety (`8ae390e3-9efc-482c-ba87-df74053e58a5`); Baby Toys (`4fc7d6de-05ad-4210-b5e6-a02c63ea1dad`); Baby Travel Essentials (`0d94e9e9-ce10-4dd0-9b92-18f856b6b2c2`); Bag Accessories (`4fc320f2-3287-4265-a6af-d8cdbfc0c1b8`); Bags (`b8e532ad-2e01-4ee3-b15d-9d74a7fcb77c`); Bakeware (`2e17464b-e45c-442d-93ae-8acb09ba4ba7`); Baking (`9e3b955c-c1a1-4332-8900-5e6d71c80806`); Ball Sports Equipment (`ee4725c3-ba3c-40ac-876e-6c17d931618a`); Bar & Wine Utensils (`2b9ef095-7f5c-4201-a0ab-ec8f1e2331f5`); Barbecue (`c2ccb0ee-d4cb-4071-a58a-09f1c5835b02`); Bath & Body Care (`2f0b59ed-c8de-483d-b85b-367f1890a98a`); Bathroom Fixtures (`398f031d-14ae-468f-9196-a73122e7d4b1`); Bathroom Supplies (`c91fa379-cf2c-4d1f-8e27-6fcb013f264d`); Beauty & Personal Care (`7713c84f-3db8-44c5-afce-a19d640ab8d4`); Bedding (`884abd73-ae70-45ce-b124-9af7fec0ddc1`); Bird Supplies (`214988d9-30f6-465b-a3da-b19988ee1fbd`); Books (`a8329a98-7bc3-4cf6-857a-cc0653a394c0`); Books Magazines & Audio (`01106a92-d444-4146-a11c-f8a29945709c`); Boys' Clothes (`eef95d01-9d16-4d23-83c7-4bed8bb7f1e3`); Boys' Footwear (`ccafc617-c47f-4d4e-800e-370d5eec0160`); Building Supplies (`56c45dd7-8a6c-4e08-b384-df7053d2f713`); Cameras & Photography (`9a45699e-04b7-4835-a900-f7618e90bd84`); Camping & Hiking Equipment (`702bf421-d46e-4076-b540-60738316499e`); Car Electronics (`bb1f27ec-29c2-4a97-b119-07a7a74e7d8c`); Car Exterior Accessories (`2294cc84-e2f6-406c-991c-9462a1f6083a`); Car Interior Accessories (`acba8585-78ec-4132-90a8-38c4f9a6ef86`); Car Lights (`a98b83ce-b0c8-4bde-86ea-e7e28e79f0ba`); Car Repair Tools (`0fb5fbc7-96fc-4ce6-a5e6-a9f5a7db28ad`); Car Washing & Maintenance (`c9384799-42bc-4cdd-8325-1279b190841b`); Children's & Infants' Books (`519663e0-b90f-4819-a3b6-6736eef69f89`); Children's Furniture (`0286672d-f486-4cbf-9681-8895148a7744`); Classic & Novelty Toys (`6faf4174-0f17-4b74-9988-7073d4e796dd`); Clothes Accessories (`4e33d5bc-b631-4442-ad76-0e8f63ad0aaf`); Collectible Trading Cards (`a17699d4-73ab-4194-a8d8-bb2d7be08ad8`); Collections (`515dd517-1224-4a26-939f-35dd1dcc2cd6`); Commercial Appliances (`cd73c480-cf22-44e2-a73d-b8898cb65297`); Commercial Furniture (`43696da5-740a-4a98-9f47-640208b70976`); Computers & Office Equipment (`a55b4252-bf00-4c54-9e36-6bf7af9a84f9`); Contemporary Culture Collectibles (`3c363b9d-1208-45ff-930b-88a792cf87ec`); Cookware (`21406d2b-03b7-4e13-8c1d-4e0cae5b15fe`); Costume Jewellery & Accessories (`0f28e7b3-0f62-483d-8ecd-b05a360fea7e`); Cutlery & Tableware (`b74adad6-a751-48dd-9a80-24f8cb50999d`); DIY (`fd3f353c-2a58-496a-afd8-8de85707f65f`); Data Storage & Software (`be525ca3-989d-40c0-95e9-b9788dac8bfa`); Desktop & Laptop Components (`e395ca62-c309-4e42-ad9d-50419c0bd5d6`); Desktop Computers Laptops & Tablets (`0b62f0cb-1395-4795-b356-1512f93be41a`); Diamond (`1564b337-96e8-493c-9c98-2504584f8ce9`); Dog & Cat Accessories (`4eb3657c-01ed-465c-9342-04bd6b371d5c`); Dog & Cat Clothing (`2db7834c-d46d-4102-869f-3b00a98e905c`); Dog & Cat Food (`c9137f80-adfa-4e46-9040-5fe79b9ea10e`); Dog & Cat Furniture (`3f1c8c45-5949-463f-bcdc-269e56f92b7b`); Dog & Cat Grooming (`62377ed3-997e-440c-8250-80a74aea9b32`); Dog & Cat Healthcare (`3fd2e134-34eb-4c27-9269-4b98b915d6ce`); Dog & Cat Litter (`b7f86ad2-70a6-4e86-a7d1-062771f3a959`); Dolls & Stuffed Toys (`9d05537a-7bb1-4e9a-b97a-ee978e28b321`); Dressmaking Fabrics (`558d01c5-fa31-4edc-8c4c-c0b312a68a32`); Drinks (`6b587af9-ef3c-4d98-a1a7-8ea37c0ef04a`); Drinkware (`83ca4b79-0331-4989-9826-8565d6134daf`); Economics & Management (`55135350-96e6-442f-b04e-7bb518ccee70`); Education & Schooling (`376555d8-60f4-4006-b627-cbb9f2acd852`); Education Devices (`7a1a9d4e-9811-4aff-95bb-377118419b49`); Educational Toys (`fd3dac91-7a69-4ead-94c4-940973d04e49`); Electric & Remote Control Toys (`7afb9dd7-4af5-4029-aa93-d38a146d0f90`); Electrical Equipment & Supplies (`ca53929f-0b13-4ed6-b42e-6716853af62a`); Entertainment (`a0f3fdf3-3b0b-4de6-bd69-d2140fe12c02`); Eye & Ear Care (`4619e8e3-a293-4d61-8fd9-bc07e3050c17`); Eyewear (`008933c3-2620-47ab-9401-4f2c0b3ed106`); Fabrics & Sewing Supplies (`a2cbfb39-7fdf-4ec7-bbab-19097070e8b4`); Fan Shop (`28c2a79e-e44a-4729-b2c4-4521556d4697`); Farm Animal & Poultry Supplies (`1bded50e-afd2-4326-bb40-906d0515991e`); Fashion Accessories (`ede8e83a-2ea8-4d4b-91b2-a65d21fc492c`); Feminine Care (`51708da9-07dc-4d6a-b8ad-d6463b7b9b6b`); Festive & Party Supplies (`11571899-a4ae-4eb9-8c9b-e3ba517d3ae8`); Fish & Aquatic Supplies (`96f87b99-0e93-4f57-8a49-9fd5de77e4ad`); Fitness Equipment (`1f69ebc3-8901-40df-8e5c-73dbaafa99ac`); Food & Beverages (`030cb99a-56e7-4c6a-9bed-e411aac2b66c`); Food Supplement (`27f62a49-8ea7-43ea-9a04-71b91136d21b`); Footwear (`1e433912-9dc5-4788-a831-bd6946b2e27d`); Formula Milk & Baby Food (`ff7b7fb1-69db-4ce7-a574-08277dbab7d1`); Fragrance (`5853c0e0-fde4-4a71-b7ef-7e7c9cc53a15`); Fresh & Frozen Food (`7d619a5a-f419-47c5-b5e1-e33f9f197451`); Functional Bags (`460b185a-c03d-402f-aacf-1266ce7df22c`); Furniture (`891b3bf0-7b3d-4dae-9cbd-b4e6e90ad5df`); Games & Puzzles (`4bf1e871-ddad-4c3d-9a4a-131910469be5`); Gaming & Consoles (`62f396b5-ee89-46c8-86fb-540e9c7be078`); Garden Supplies (`9fdd47cb-a216-4856-8689-946523969cbf`); Garden Tools (`07e6ffd7-51a7-4eee-b65c-07401072f8d1`); Girls' Clothes (`0bd17f7c-4085-40d5-a04a-692e8b169a84`); Girls' Footwear (`c269618e-89cf-4a2e-87d5-485681faae51`); Gold (`067b5694-9bc7-4c20-8093-a778927cd986`); Hair Accessories (`aedafb87-8907-44e7-9d34-51788142effe`); Hair Care & Styling (`c2e545ed-3769-4105-ba9e-22c763a23bfa`); Hair Extensions & Wigs (`94ce6559-bbd1-4e63-8017-79b3a48340d4`); Hand & Foot Care (`7fe525bf-cc0d-4aeb-8dfb-82c2c577e8d7`); Hand Foot & Nail Care (`2ec2a527-3167-49bb-8c31-ada80e6db3f1`); Hand Tools (`9ec1f1f5-a470-458f-b463-c21aa9401f60`); Hardware (`b39aad64-a884-43d2-8da4-b1f373bb1e4d`); Health (`3854de47-9545-4d0e-a6a9-97639c3d6a4d`); Hijabs (`4ebfb64b-8e03-43c6-8309-a658fb2412e1`); Home Appliances (`c2502673-5110-49bd-89a9-cd385650a568`); Home Care Supplies (`c0af4593-a403-4ffb-b7c3-287e65e83bc5`); Home Decor (`b756489e-d349-42d5-b1d9-0e19cb47e523`); Home Improvement (`c8577287-d04c-406b-8af6-f91e27845cea`); Home Organisers (`8899c2b3-3cc8-44b0-92c5-5bbb3dbdcf53`); Home Supplies (`edcda7e3-813b-4073-9f27-b104cd283d6c`); Household Appliances (`7fa1b4e1-9094-41e5-be72-42c4eaf6e642`); Household Textiles (`5d2a77ec-48d5-4fcc-a133-a0435ea26453`); Humanities & Social Sciences (`78a7e6a2-3292-4e4b-9cd6-cd03444a791c`); Indoor Furniture (`6b8993d3-e986-47e3-8f4e-9024987759d5`); Instant Food (`85bf0954-4cc3-46c6-b909-f7ca9aebe7e6`); Islamic Accessories (`0ee4a170-e67d-47f2-8985-443f03455ff6`); Islamic Sportswear (`2993efbc-404a-49f0-a252-12fd8b75184d`); Jade (`43b1351c-f8ce-44d2-914a-3b6fb3041206`); Jewellery Accessories & Derivatives (`c9c58810-e8e9-4c8b-8891-644ba0ac46a0`); Kid's South Asian Clothing (`45b77113-adb3-4051-b978-59d8a6e37933`); Kids' Fashion (`67f5f958-5134-4d29-ad5b-44738d63289f`); Kids' Fashion Accessories (`f904a042-3937-43d9-b180-43a4923c2f24`); Kids' Islamic Clothing (`a34df70c-61a7-4a8e-9a32-cfbdd61d6295`); Kitchen Appliances (`8afa550b-8ac2-4da9-a9d2-3827a2e333b0`); Kitchen Fixtures (`2dfdb68b-0a1b-4a79-ba31-965a87a1f41a`); Kitchen Knives (`02c1f4bc-0207-40c1-88f2-985e35b29dd2`); Kitchen Utensils & Gadgets (`fa3356d2-5f77-4ceb-b987-6f31f1737832`); Kitchenware (`2d2cf4cd-bc75-49c4-beb9-f445b0ab9755`); Large Home Appliances (`70231663-fd38-4782-a2e7-51d36aa50f3c`); Laundry Tools & Accessories (`260d8473-4126-49c6-b940-011e959daf94`); Leisure & Outdoor Recreation Equipment (`69a7ca9a-6272-4bf5-83cf-f0df3d78f863`); Lifestyle & Hobbies (`660453af-8e91-4ef9-981a-fc706c653395`); Lights & Lighting (`fee87534-76b3-4c9d-b5e6-4319bb1e20b0`); Literature & Art (`2fb4202e-9985-4a1e-8b1b-eaadf1735e2b`); Luggage & Bags (`a17888a5-9c9b-43db-90d8-59785908db55`); Luggage & Travel Bags (`3cc41590-ffc3-4f52-be32-810ce9358a72`); Magazines & Newspapers (`425321cc-52cf-4e94-85d9-373893677c78`); Makeup (`4996bdb4-c157-4d95-8fc3-37d1df8109dc`); Maternity Supplies (`24c9bc4d-ca2b-4e5a-8943-e8231f1bbd0d`); Measuring Tools (`092b5b8d-f3ee-4c08-b2c6-2847760466ed`); Medical Supplies (`890349c4-c22b-4b06-bdf6-2649272b9ea2`); Men's Bags (`69d64916-73de-4525-a099-be23e589171a`); Men's Bottoms (`ee2e666e-ad86-43a0-8efd-e278b82eab38`); Men's Care (`23879885-063a-453b-acaa-ca102a77069b`); Men's Islamic Clothing (`097277a1-88c3-405d-895c-5d2d827e7767`); Men's Shoes (`e8c83c84-21d9-4715-93a0-43c9bb11b4b9`); Men's Sleepwear & Loungewear (`ecbfa8b9-e35e-4749-9e46-e1873a755fd0`); Men's South Asian Clothing (`5548f4b7-1be3-4547-ae8f-bd59454ffdc6`); Men's Special Clothing (`f0d6215f-dc31-418d-95b1-d45f72a52f0b`); Men's Suits & Overalls (`250d6847-4ca7-40d3-9fe6-c95638b27853`); Men's Tops (`5e29aca1-8ba0-4601-ab84-f7afddad72a1`); Men's Underwear (`89e7df60-3cec-4a76-86c3-8b8cf9904702`); Menswear (`fa85e336-4623-495e-92c2-cb4cf2d61ace`); Menswear & Underwear (`aa6439bc-ed09-41aa-a921-0adf672969db`); Milk & Dairy (`825e446a-807e-4779-9909-e1554571a476`); Miscellaneous Home (`9f0fc103-6c87-4fd5-86c7-93cb20f49a3b`); Motorcycle Accessories (`ae14c80c-c7a7-4811-bc9e-09ba0d3ea3e2`); Musical Instruments & Accessories (`da50c572-6a75-4361-9771-24aaefee4826`); Muslim Fashion (`34d29324-b72a-4120-8c64-ce5cc8f74d4a`); Nail Care (`f00e023e-72db-4af4-80b0-238d21e8932b`); Nasal & Oral Care (`20645f06-5e66-487e-8872-b7827b2cda0e`); Natural Crystal (`195d2107-9d33-47bc-a2a3-403cb6df2fc6`); Network Components (`88d50219-df5a-4e14-8973-6d39db92b791`); Non-natural Crystal (`4403ff38-3d6b-4039-a85a-773172539684`); Nursing & Feeding (`068b6cc5-9ad1-46e5-968a-42e1236d8af7`); Office Equipment (`17a28dd0-f00c-44b1-a7c9-9ced236665f6`); Office Stationery & Supplies (`a88116af-3816-46f7-8aeb-01aea9d4a601`); Outdoor Furniture (`a3aeeaad-84a5-40fa-b170-1cf7592491b8`); Outerwear (`bc128ee4-60eb-48a5-b2b6-8e9e0357268e`); Pearl (`35a9e0fe-f680-4d49-afe3-d70e4d0f8899`); Peripherals & Accessories (`f1bf1871-7f1a-4376-9f56-ac0d58981b71`); Personal Care Appliances (`87c9fa18-cd07-4063-a0f0-dbe749a4ccbe`); Pet Supplies (`547840e0-8135-4481-9d22-0f0bf57ab70c`); Phone Accessories (`39870d3c-37da-45ce-bdcc-0e0b0a964249`); Phones & Electronics (`0274769a-71da-4e2d-9d1b-f3ca7bd6176b`); Phones & Tablets (`095a44c8-b5ad-417a-8560-c7138c13edad`); Platinum & Carat Gold (`216c9019-152e-4bd3-ada9-a44164620b56`); Power Tools (`4f7d19cb-4191-414b-83ea-f23ec778979d`); Prayer Attire & Equipment (`7d60990b-8998-4969-8beb-197970065cce`); Pre-Owned (`0337cb7b-9092-4f61-9cd4-3f9fb93445ad`); Pumps & Plumbing (`256b1710-3104-4349-a7f1-8ad226ec8830`); Quads Motorhomes & Boats (`5555d60a-1b05-4711-95b8-9824861ed008`); Refurbished Phones & Electronics (`64fc865e-4626-4acb-940b-1e57f4bf493b`); Reptile & Amphibian Supplies (`c39db8af-8ae3-4d8e-9679-c7b4b7089030`); Ruby Sapphire & Emerald (`30ac81b0-6fab-4840-9596-531bb325f680`); Science & Technology (`54bc2784-e005-4ba5-86eb-e9ac04dca6a7`); Security & Safety (`5b8b48f5-70ce-4085-a504-9fe85142c069`); Semiprecious Stones (`ecfeae89-1376-483c-988d-5e5cccf91290`); Shoe Accessories (`c83eb7a3-be2d-45df-8da7-85f898861714`); Shoes (`ec2bcec0-1396-4e37-99d2-287d659fa3ae`); Silver (`1213f9f7-2d51-4e4d-b4d3-96aee4b472a6`); Skincare (`d78534c4-cc24-4e4f-a2f3-d42d2797bf33`); Small Animal Supplies (`cf3d6983-ac8e-4316-b64c-164e1edca43b`); Smart & Wearable Devices (`551d5a33-321c-4b9b-892b-95ffd9a5ea64`); Smart Home Systems (`11c1d0f3-8830-441f-a43f-efcf47968ef9`); Snacks (`e90cf227-4ae2-4526-818b-4b9c7c4e2fe5`); Solar & Wind Power (`97f71131-3131-40b8-92e1-4fea26b97b84`); Soldering Equipment (`176b8a5f-2728-4c7d-95c5-e3b02601cd72`); Special Personal Care (`d556a2da-dbf0-4d91-8aca-457f8aeb73d5`); Sport & Outdoor Clothing (`3105b54f-b701-4c6c-b37c-2071a55b0a0f`); Sports & Outdoor (`bc7c3bef-4968-4499-9bf7-665ca578f880`); Sports & Outdoor Accessories (`3fb3da82-f642-4c12-ae5f-64479d2f5e72`); Sports & Outdoor Play (`70321c47-3629-41b9-a62d-a2472a2b31cc`); Sports Accessories (`a0cc4df7-4b5f-4a2f-b301-811e6a442da3`); Sports Collectibles (`6b4cab93-f078-4806-9bd4-a7aceff48879`); Sports Footwear (`b9a0dd31-077b-475c-a5a9-329d446e32c7`); Staples & Cooking Essentials (`4f111384-7935-4487-bc00-405d216f3bdd`); Swimwear Surfwear & Wetsuits (`ea5cefb0-4239-4805-9114-12965750af90`); Tablet & Computer Accessories (`8eba12d3-f436-4ba3-a547-d31538f1f471`); Tea & Coffeeware (`8f872b84-7aba-4ea3-999d-08a3756ac05a`); Textiles & Soft Furnishings (`f96211e0-a1ed-433e-bbe2-ca1b371ab915`); Tool Organisers (`34b534aa-dffb-49aa-b495-5bee0a6d510f`); Tools & Hardware (`3119f6e7-046a-4a5f-b4fb-82e78b7a2a28`); Toys & Hobbies (`dea4eac7-8972-4baa-8c4c-2c668055af07`); Trading Cards & Accessories (`c2c8deee-2cf2-438e-b612-94dd0939d308`); Umrah Equipment (`a25bc787-8963-4ef7-9a94-92116ebb8806`); Universal Accessories (`a25c8f75-a7d5-4681-82fa-07e4257972fb`); Video & Music (`7d810554-33e5-4c4a-8c07-2a350811265e`); Watches (`84c57b55-5fe5-4dc0-8e6a-e12c7affb617`); Watches & Accessories (`a6670f98-12a0-4580-a5ae-c8f8f53b5f26`); Water Sports Equipment (`78e57268-e1e2-449f-9f17-bbf1dbaea703`); Winter Sports Equipment (`1cb99fc1-ed0c-43f0-9e9c-868b88333cae`); Women's Bags (`46a8ed1e-5ac8-4e6a-9191-efe66216c713`); Women's Bottoms (`d61dbf6f-086d-4f9f-8250-b3c78bb29909`); Women's Dresses (`a14e82c9-bfa8-49c6-8607-1cbebfa5135b`); Women's Islamic Clothing (`8f395c12-213d-4990-8e0a-91363c06f1b9`); Women's Shoes (`0cfff8a9-7d4b-43b4-84f2-417b175ee133`); Women's Sleepwear & Loungewear (`0625849b-49ab-4bec-b8b7-d876ec46b0c3`); Women's South Asian Clothing (`a85baf7e-412b-4e78-a806-d802c4c4c2ad`); Women's Special Clothing (`0352c14c-4365-4463-b567-5e00b56ef2f8`); Women's Suits & Overalls (`c31527aa-ea6e-44aa-8303-9f5fffa169b1`); Women's Tops (`9bac87fd-88a8-43bd-9712-bb9a8f28d3f9`); Women's Underwear (`8b1035d6-2d47-4e5d-afdb-4e9e2259646a`); Womenswear & Underwear (`fe0732b9-e9f5-490e-ae92-8d872851185e`); Health/Food Supplement (`47def84b-b522-4237-b7a5-8d9f990d0453`); Household Appliances/Kitchen Appliances (`48d3e545-e9e7-4213-8670-386f5b06c89a`); Beauty & Personal Care/Personal Care Appliances (`97984d18-b11c-4e73-81b9-89c30eb8a6ac`); Home Supplies/Home Care Supplies (`b5226af7-715b-49b0-92e4-65f3e7ef4d7f`); Health & Personal Care (`d800dc04-91c6-4e15-85cb-dc8aca5c8d3a`); Fashion & Apparel (`ef755127-b8ad-48bb-b5d9-a1fa85322ae4`); Health & Wellness (`98f78024-e863-419f-8a3a-f9ea80319871`); Wellness (`0bb6ec2d-3903-44d6-a9e7-e5b3b8d8aa5c`); Fashion (`57077071-b715-44f6-921a-0b39d1e7742b`) |
| Stage | SINGLE_LINE_TEXT | Ocg10 |  |
| Geography | SINGLE_LINE_TEXT | K0Q7p |  |
| TikTok Handle | SINGLE_LINE_TEXT | H7Pbp |  |
| TikTok URL | FORMULA | M3yBL | `"https://www.tiktok.com/" & {TikTok Handle}` |
| Website | URL | UcFqD |  |
| Target audience summary | SINGLE_LINE_TEXT | VypCI |  |
| Brand voice/tone | SINGLE_LINE_TEXT | WauKx |  |
| Core pain points solved | LONG_TEXT | HG8G4 |  |
| Positioning statement | SINGLE_LINE_TEXT | fnKei |  |
| Status | SELECT | fdWjt | Active (`e85f6adf-4e50-410f-b403-49eaddbb0416`); Inactive (`ebe579e4-db90-4b1f-b8a3-dd00dc7f3fd4`); Requested (`0ea21d23-9fd7-461f-bec0-05bb49290ab1`) |
| Brand context | LONG_TEXT | tRjSk |  |
| Primary Platforms | SINGLE_LINE_TEXT | msnGW |  |
| Desire Drivers Summary | LONG_TEXT | 952n2 |  |
| Date Added | DATETIME | UyYiV |  |
| Storyboard/Script | LINKED_RECORD | TTGzg | → Storyboard/Script (multi) |
| Products | LINKED_RECORD | MMg4a | → Products (multi) |

## Products
**Table ID:** `zJPuKZNjMXTqUU`  
**Field count:** 25

| Field | Type | ID | Options / Notes |
|-------|------|----|-----------------|
| Product_title | SINGLE_LINE_TEXT | AHF5Y |  |
| Website (Brands) | LOOKUP | OIeID | lookup Brands.Website |
| Brand | LINKED_RECORD | CcQcZ | → Brands (multi) |
| Positioning statement | LOOKUP | 3Os9p | lookup Brands.Positioning statement |
| Desire Drivers Summary | LOOKUP | DMztp | lookup Brands.Desire Drivers Summary |
| Brand context | LOOKUP | 38lXP | lookup Brands.Brand context |
| Core pain points solved | LOOKUP | VEoEN | lookup Brands.Core pain points solved |
| Target audience summary | LOOKUP | YlVpJ | lookup Brands.Target audience summary |
| Logo (Brands) | LOOKUP | o6DQu | lookup Brands.Logo |
| Social1 (Brands) | LOOKUP | mCK3q | lookup Brands.30 days |
| Product_link | URL | 4DQmQ |  |
| Product ID | FORMULA | EIBHW | `SUBSTITUTE(RIGHT({Product_link}, 19), ".jpg", "")` |
| Product_image_url | FORMULA | E4EKm | `"https://social-listening-images.s3.us-east-2.amazonaws.com/products/" & {Product ID} &...` |
| Views_display | SINGLE_LINE_TEXT | Cfn4N |  |
| Categories | SELECT | XTQgx | multi; Humanities & Social Science (`ce7cbc37-4411-4996-b4d9-ee55e26c82a6`); Phones & Electronics (`a0ea87e0-e284-4158-88b8-30d2ca9c4819`); Makeup (`ca84cc0b-b26d-400e-a25c-71cb397208b2`); Womenswear & Underwear (`50e5c454-4bfe-473b-859c-37c9a606d0c0`); Drinks (`8cf92716-f3dd-48ab-bb84-48848e12c0a2`); Skincare (`7bbc53b9-0051-4817-8b77-ef22518d16a9`); Universal Accessoires (`2d2825b6-2e45-43d5-852c-246e6e6b7ed3`); Women's Sleepware & Loungewear (`acdfa00f-9ad5-443e-a9e3-f4e1c15fc9bb`); Home Appliances (`76b52b88-ea54-4c99-9392-7b033796ef25`); Home Supplies (`0f97605a-5de9-4df9-ac16-7f81a32b1cb2`); Fashion Accessories (`56667644-3d94-4ff2-9c05-ca3c3353b32a`); Textiles & Soft Furnishings (`cdf03042-7f1c-47f8-8659-ee04e0452ec3`); Fitness Equipment (`5fd53088-cf4d-4464-8b55-b1df3cdb4fe4`); Beauty & Personal Care (`e6fd1708-36c0-4700-95b1-bc5913f6fb92`); Food & Beverage (`5f73e4cb-3493-4778-a7e4-5de2de9514cc`); Personal Care Appliances (`b79dce72-c0eb-4f31-83bb-31a267cb6ceb`); Fragrance (`a42f7955-8c02-464e-a068-8844b365fb4e`); Kitchen Appliances (`61bd061c-1ca4-4f2e-837d-af9340f96488`); Books, Magazines & Audio (`d765f972-a3bf-48dd-9bd2-b494b4e19b01`); Sports & Outdoor (`494369b0-1b56-4947-8d01-a6be599715f9`); Trousers (`8d7a3611-c5c5-496f-81d2-7f5b4ceae8fa`); Hair Care & Styling (`f3808eb6-03d2-4106-aef4-a8c91834a2f3`); Bedding (`da0854fb-1039-4969-b252-c7a821ad0261`); Costume Jewellery & Accessories (`6904a03b-3c11-4457-8de5-b5bd4a004060`); Nasal & Oral Care (`fb239df2-f0fa-489a-9203-64fb082df137`); Health (`9a95baf0-919b-4ecc-938c-985c8e2c3ed5`); Vitamins & Supplements (`44b259fb-26bb-4fdb-8b91-9ea7511de60e`); Food & Beverages (`ce039dae-6735-43e8-8c37-5ca6364aa05d`); Beverages (`4069a07b-5425-4752-b153-162122fd8119`); Kitchen & Dining (`c1697d9e-4e6e-470d-9a52-4f0247021c5a`); Storage & Organisation (`a4521c7a-683e-4037-9da7-7b90e49a7562`); Toys & Hobbies (`c0b6c773-be61-4949-b314-c97649222735`); Outdoor Toys (`7a9afc39-1add-4805-8a2f-b11cf6150435`); Headphones & Headsets (`09a135bb-ea1b-43a5-a86b-efabd2fbf7a3`); Phone Accessories (`8ea45d79-ff09-4b01-8c89-8e25ad9c8ff1`); Food Supplement (`ba19dd01-72c2-466f-b77a-68e610a40d89`); Shoes (`0c019532-7df7-4871-9375-c08b59ef8c7f`); Casual Shoes (`bee537b4-6d0a-4e4a-8432-2ff89d42d11c`); Women's Clothing (`1d4a0ab1-e7cc-49e5-a5a3-a9383ff42fc0`); Outerwear (`162940a4-f38e-4054-934a-b93f52da8956`); Dresses (`c3accfbe-d8d8-4eab-97f2-d151724cb101`); Top (`5e561c45-4a5a-46b3-a550-f3e332029f3f`); Hoodies & Sweatshirts (`c0a588a7-577f-4512-9b88-874b593e267c`); Bath & Body Care (`8d65c0f7-9ca8-4757-aae3-f1c0c9bf97c0`); Women's Underwear (`87f09ade-0fc7-4d5a-a211-72a22fae6d19`); Women's Shoes (`8bbf8ecb-e041-411c-a0da-2d6f81bd0995`); Women's Tops (`89ff7479-80bd-4ad5-94fa-5a1c9fa41244`); Women's Dresses (`eb1fad4e-bc52-4a63-a1a4-cffaf242adef`); Home Care Supplies (`fc6f9cc7-0511-4066-9505-e6808355e668`); Household Appliances (`2d984d9e-d8c5-4be1-a9a2-1216f6f9a93b`); Instant Food (`c68396e0-9d3b-4abb-b2b1-340522a9d9e1`); Hair Extensions & Wigs (`48a57424-db0f-4544-b769-7b4b1450d456`); Hair Accessories (`73919e0d-d8a0-4c85-ae34-072c307f6e11`) |
| TikTok (Brands) | LOOKUP | tAoej | lookup Brands.TikTok Handle |
| Units_sold | SINGLE_LINE_TEXT | zNJ57 |  |
| Average_price | CURRENCY | v3IfP |  |
| Product_gmv | SINGLE_LINE_TEXT | RiiGL |  |
| No Videos | SINGLE_LINE_TEXT | FFSGd |  |
| Date_captured | CREATED_AT | cfgWC |  |
| Storyboard/Script | LINKED_RECORD | 86upI | → Storyboard/Script (multi) |
| Videos | LINKED_RECORD | 7aYjt | → Videos (multi) |
| Viral products | CHECKBOX | zuBVn |  |
| Status | SELECT | 6gnj2 | Active (`dcb21171-a995-47f7-af9d-3f37d58934e6`); Inactive (`ad67df79-4183-4899-b403-84b7c06900e4`); Requested (`69e66e39-1415-4e9f-ac93-8e6ca193dd3e`) |

## Videos
**Table ID:** `dk40PsHx4tsnIi`  
**Field count:** 5

| Field | Type | ID | Options / Notes |
|-------|------|----|-----------------|
| Video | URL | 177Xh |  |
| Product | LINKED_RECORD | 1jOSh | → Products (multi) |
| Brand (Products) | LOOKUP | EcG4B | lookup Products.Brand |
| Created at | CREATED_AT | iXDlj |  |
| Script | LINKED_RECORD | 0pRMK | → Script (multi) |

## Script
**Table ID:** `ct0pnjOpnV7oy8`  
**Field count:** 54

| Field | Type | ID | Options / Notes |
|-------|------|----|-----------------|
| Concept Name | SINGLE_LINE_TEXT | yfiqQ |  |
| Full Script | LONG_TEXT | AtsZG |  |
| TikTok | URL | 8FleF |  |
| TT Thumbnail | URL | MkBAs |  |
| Video URL | URL | 8xopk |  |
| Concept | LONG_TEXT | 1f0aL |  |
| Format | SELECT | FnQtV | Us Versus Them (`69af1151-611a-4504-bace-c1f14ff5df9d`); Feature Point Out (`fe445dfc-76f6-4e2c-8d51-2fbb3e533863`); Founder (`9bf081cd-ba0f-444f-990e-d34863ee246a`); Expert Explainer (`f3abff98-ba25-41a7-accb-77b3c654d80d`); Post-it (`d9e63b1c-129f-4e03-826f-bb2c4a2ff72c`); Before and After (`dcef5a14-af26-4ab8-a20d-f17d102d8c4a`); Native Text Overlay (`dec09612-6151-461f-a0b6-34676536e41f`); Skit / Comedy Skit (`0ff4bd29-5317-4e5d-aeb0-ea7d93a781c8`); Press (`1d69fc20-becd-4d33-94ad-70d6ba17e3e3`); Testimonial / Customer Review (`33cc4dc3-8161-48d9-a0f6-72b5d70d5be9`); Storytelling (`4b6e0e1d-d7ea-4126-a6e0-8f1204f798d2`); Greenscreen (`67568635-9c21-4ab8-8054-a81e9f4b39e0`); Tutorial (`262e31a6-4de2-4e87-a1b6-a0832c9836bc`); Social Proof Mashup (`16e3a096-ea37-4672-b84b-b507ce8aedfc`); Reaction Video (`691e64a6-cd81-440c-9dcf-976c903a7ab5`); Unboxing (`b62b8cdc-5022-4a36-aea5-dbe72a0d7f48`); Listicle (`3e7b97ee-953f-4fae-8373-a8b824503a13`); POV (Point of View) (`3742f081-0bca-460a-b9d1-c2b2c9559f43`); Styling Reel (`ce55b8f8-dec7-4e61-816b-b0a05102405b`); Trend (`aec772bb-08d5-4d3e-b90f-3f6d1621b688`); ASMR (`9a413f20-ecc8-4804-989d-227974eccb30`); Street Interview (`610737d3-5f31-4276-b15f-46b01efe6f67`); Podcast (`8f49c643-3aff-46ce-af26-66d92bbfecaa`); Comment Response (`103d60d5-1e4f-42cb-add5-9fb90170fd39`); Product Intro (`3b59242e-bf52-4081-b3c8-67dfbec538f4`) |
| Format Type Image | FORMULA | 1u3lP | `IF({Format} = "Us Versus Them", "https://res.cloudinary.com/dmrekfwpj/image/upload/v177...` |
| Stage | SELECT | 3JMBl | multi; Most people won't know this product yet (TOF) (`de9b0540-79b4-4909-bc35-d1879ab6fa04`); People might have seen this around (MOF) (`8862b61b-a145-4c88-aa9d-e73c71e7617c`); This product is already popular (BOF) (`0a6cfd8c-ed02-4bfe-a4d5-5d9c2b8dc687`); MOF (`a9219a0f-31fd-410f-92a2-00c35abdee6d`) |
| Direction | LONG_TEXT | vdaEQ |  |
| User | LINKED_RECORD | Zx2Zh | → Users (multi) |
| active_months | LOOKUP | D9Y29 | lookup Users.active_months |
| cycle_start | LOOKUP | kRJBS | lookup Users.cycle_start |
| cycle_end | LOOKUP | GcLBS | lookup Users.cycle_end |
| join_date | LOOKUP | nNQQr | lookup Users.join_date |
| Brand | LINKED_RECORD | rT2vM | → Brands (multi) |
| Products | LINKED_RECORD | Uw7A5 | → Products (multi) |
| Video | LINKED_RECORD | N1gjT | → Videos (multi) |
| Type | SELECT | c2mGe | Script (`58cbb1ec-baec-4c40-b937-c8b0245d7e68`); Remix (`7cf57199-55cd-4e2e-8b0f-4942e2f82102`) |
| Content Type | SELECT | Zsby3 | Organic (`8fb2cfa3-d217-4234-a5d9-9daf0fc1d481`); Shop (`e0513db1-a075-4d45-8310-844cd5425101`); LIVE (`6f43e78f-ff27-4120-bcaa-f3653d53da0e`) |
| Live Type | SELECT | ni55s | Regular (`5062bcb8-3b0a-4b2b-b494-85fdaacb62f3`); Shoppable (`28d53025-ec3a-4684-a2ac-2f1ffd909228`) |
| Storyboard/Script | LINKED_RECORD | d8vgX | → Storyboard/Script (multi) |
| Views | NUMBER | bX3Hn |  |
| Likes | NUMBER | DSM0D |  |
| Comments | NUMBER | AwZCa |  |
| Shares | NUMBER | m50vz |  |
| Downloads | NUMBER | XQ4gY |  |
| Saves | NUMBER | COZ91 |  |
| Music Artist | SINGLE_LINE_TEXT | vKAgz |  |
| Music Title | SINGLE_LINE_TEXT | 3WGbG |  |
| Posted | DATETIME | gNbK9 |  |
| TikTok ID | SINGLE_LINE_TEXT | ySljV |  |
| Author | SINGLE_LINE_TEXT | aCrZU |  |
| Handle | SINGLE_LINE_TEXT | lic4U |  |
| Region | SINGLE_LINE_TEXT | Kg7Or |  |
| Title | SINGLE_LINE_TEXT | VuAvu |  |
| Content Description | SINGLE_LINE_TEXT | qDrND |  |
| Hashtags | SINGLE_LINE_TEXT | sukIs |  |
| Duration (seconds) | SINGLE_LINE_TEXT | iCPKt |  |
| Is Ad | CHECKBOX | TbnT0 |  |
| Ad Source | NUMBER | 8xnen |  |
| Adv Promotable | CHECKBOX | sfS9x |  |
| Auction Ad Invited | CHECKBOX | WrblA |  |
| BC Label Test Text | SINGLE_LINE_TEXT | d3N3W |  |
| Branded Content Type | NUMBER | H12zT |  |
| Is Diversion Ad | NUMBER | F5Z1S |  |
| Organic Log Extra | LONG_TEXT | kArxv |  |
| With Comment Filter Words | CHECKBOX | 22C3o |  |
| Item Comment Settings | NUMBER | wE0nh |  |
| Mentioned Users | SINGLE_LINE_TEXT | a3Eh5 |  |
| created | CREATED_AT | vptIi |  |
| current_billing_cycle | FORMULA | zNCY9 | `AND(   {created} >= ({cycle_start}),   {created} < ({cycle_end}) )` |
| Embed | FORMULA | fDs4b | `IF(   {Video URL} != "",   "<iframe width='315' height='560' src='" & SUBSTITUTE(SUBSTI...` |
| Thumbnail | FORMULA | UyEZk | `IF({TT Thumbnail} != "", {TT Thumbnail}, {Format Type Image})` |

## Storyboard/Script
**Table ID:** `moJabgXWJZmGeK`  
**Field count:** 24

| Field | Type | ID | Options / Notes |
|-------|------|----|-----------------|
| Concept Name | SINGLE_LINE_TEXT | yfiqQ |  |
| Frame | NUMBER | sAfaI |  |
| Section | SELECT | qNYv4 | multi; Hook (`1d57f6e6-b7b6-44a8-b0e8-79b1cfce7209`); On-ramp (`a1ac92be-10d5-49c6-8cf6-42a8502b356f`); Problem (`38d54528-64bd-48f3-8324-54c6461fcb08`); Agitation (`844cb70a-7fd1-411b-8d7a-c423d78c07cc`); Motivator (`85619b37-11f2-447e-8ad3-3f9aa830a787`); Solution Intro (`9eb60087-c277-42f4-8558-81e36a383b7c`); Product Intro (`dd310e69-5dd9-44ad-8c04-9735a08ba3ba`); Demonstration (`af6985e3-522d-471c-930a-64134c2c101e`); Education (`f75ea038-f5bc-499c-be68-ccaa724ea375`); Proof (`be6a79a4-50eb-4fb0-b022-7fb0c1143b5d`); Trust Builder (`bf70b417-a9bb-4a9c-9a17-79a291d1a6bb`); Offer stack (`51f6b0b3-08cd-4d78-8020-11567cce308a`); Persuasion Levers (`d982188b-7fab-494d-b340-b7cecef2dd06`); Engagement (`2962cc60-413c-4514-8e7f-236511684159`); Community (`911cffb8-4e35-496e-8822-2626b48d6f64`); Objections (`c6f5e798-eaf5-47f1-ab76-043d3d9e09b0`); Reassurances (`c2018dc7-0c55-4563-bdb8-a0a4901b74df`); Call To Action (`3db24151-8637-40da-810c-892a84a6ef02`); Urgency (`cb2b2226-7356-485c-a8bf-948f64167d3c`); Outro (`cda8f8b4-be0b-494d-8eef-383862d0a498`) |
| Section Details | LONG_TEXT | pR9P6 |  |
| Shot Type | SELECT | WqgDZ | multi; Single (or 1-Shot) (`077d2721-38ec-430f-b9ce-c6d734848a0f`); Talking Head (`db419563-ce4d-4a19-aec0-432403177127`); Face-to-Camera (`62c548b7-0d40-4ebf-9795-5f2a7fea1c1c`); Two-Shot (`426ba7da-1cbc-43f4-9ecc-bbf072e763d0`); B-Roll (`8695c786-7b09-4ba8-a13f-17e51a7cc376`); C-Roll (`91a349f2-5797-48fb-91bb-07549480fa28`); Cutaway (`4a35e4de-b801-4fa0-95de-b3a6a437b147`); Reaction Shot (`eafd19d0-67d9-4387-82cf-b82c0d6361b0`); Extreme Wide Shot (ELS/EWS) (`de1815ee-f0a6-4edb-83b2-51e6f107dddd`); Wide/Long Shot (WS/LS) (`7653414c-a9a2-4248-b642-b0b266dac782`); Full Shot (FS) (`08dfcc1a-13fa-48f9-bd32-9f75bfe79b5e`); Medium Long Shot (MLS/MWS) (`165b1c5e-acaf-4f1d-ba73-cba52a000862`); Cowboy Shot (CS) (`9f9ab0cd-b873-4ce7-b322-cc9c433ce094`); Medium Shot (MS) (`c1aaccdd-02af-4f35-9e7f-c5a531e6912b`); Medium Close-Up (MCU) (`61056c2c-5600-4bdf-abe9-9e560cd591e8`); Close-Up (CU) (`57977ffa-12fc-4aa0-8a9a-00100f4e6f74`); Extreme Close-Up (ECU) (`ca36d17f-47e6-4020-91cd-3723aa89da78`); Over-the-Shoulder (OTS) (`92296d10-f48d-44aa-9433-8852e1f4998a`); Pan (`041d547e-8915-408a-9133-e2057005613b`); Tilt (`b3e7b092-3cc6-4cb8-99d2-aaf778479be1`); Tracking/Following (`65d050b3-4f02-4717-82c0-dcca06f75fdb`); Handheld/Walk-and-Talk (`64562c6a-9a95-405b-9fd1-09c28cc247d0`); Dutch Angle (`0f5be1cd-a0fc-472f-aa7c-102c6c5aadc5`); Low Angle (`9f787d14-e37f-40a7-b26d-6169dfc05036`); High Angle (`997bc036-1541-4824-8ef5-7e286bb567c2`); Product Shot (`4512c9f8-7f80-4db4-9864-89a724fd41ad`); Before/After Split (`4d085a28-2db8-493e-85b1-72e107fdd8dc`); Screen Recording (`24680356-1765-4b64-afa7-07bb757854b7`); Transition Shot (`90263d06-688b-4664-9321-ddceaaf1c0d2`); Green screen (`bf345c7f-35f3-46d9-a841-4a6d65e39e5b`); Medium Close-Up (`293565bb-000a-4c5e-8ffa-86ded890fa40`); Close-Up (`d4bee5a4-6282-49ae-9a94-13126852af81`); MS (`54c144bc-e2bf-4589-9b7c-8326c9f315ac`); CU (`1ef5fccd-a4d2-40a1-a8d5-be3b370455c8`) |
| Shot Detail | LONG_TEXT | rDPdn |  |
| Voiceover Tag | SELECT | PWiAB | multi; Pain (`118d0d5e-3330-4a03-9e39-1570ddaf922b`); Problem (`e4192f1a-d8c6-419a-8112-175f3b6b9d69`); Contrarian (`3970546f-4583-41dd-b340-b0e155b9881d`); Statistics (`cbfc7aff-8090-46be-bc9a-e3b3ccf33803`); Numbers (`380ccb4a-7f1d-41b8-89bc-f103c71ee1d3`); Enemy (`f3b0770b-446f-4380-8dc1-5db860fd7675`); Comparison (`e4265b05-4bd2-4192-a0c3-1a4233c78611`); Before (`2f61c9d4-8ab8-4ede-b5fa-4afa8311638e`); After (`fc3e166b-aca9-47d6-9ea1-117721f393b4`); Social Proof (`13da15c2-f3dd-466c-8a68-695a32638ffb`); Direct Question (`746629aa-fc5f-462e-b472-673c9395f46d`); Pattern Interrupt (`60bef131-aacb-43d5-a6c7-2066b6bf0417`); Desired Outcome (`cafb374d-d9d4-4607-9ee7-a8779bdadf1a`); Curiosity Gap (`deb20e3d-0952-48d2-8fdb-47aa5a23bebb`); Call Out (`04550783-7fe5-4ced-91e0-2fa2330be254`); Confession (`b07325dd-b8da-45b3-a16c-f6110ab0cbca`); Vulnerability (`248d9bdd-9021-4882-85df-a7fa6b129125`); Revelation (`1c9bdee5-6b1f-410f-a053-d18241e86bbe`); Secret (`ecd0558a-0bb0-4869-85bf-d54d3d73119f`); Authority (`fb0720f2-e777-4f26-b037-c54de19a384e`); Credibility (`3a62b070-2beb-4d5d-b532-0262669be3c1`); Story Setup (`6218089d-6cec-4082-91d0-99af0a32c54f`); Urgency (`d54d09c8-dada-4270-b9f8-e85f552dd759`); Scarcity (`faa6e288-582c-4604-bd18-8738f76163e1`); Relatability (`e29b5c54-a7a8-4ecf-909f-aeb8b987c112`); Challenge (`d1fbd7fc-122a-43b5-a587-96a272bef6c9`); Dare (`88b226f1-8325-41fd-abbd-233df36e1f4d`); [Pattern Interrupt] (`bd1b8c7c-befd-4e22-aed2-2c309d46417c`) |
| Voiceover | LONG_TEXT | MTWyV |  |
| Script | LONG_TEXT | ofrnY |  |
| Caption Tag | SELECT | pBk7E | multi; POV Scenarios (`54b72884-b02d-4509-992e-cc47df6add0c`); Question Hooks (`c5f4d105-b3be-4719-aa7e-8c0954748895`); Gifting Hooks (`84188c70-ac33-4dcf-9840-438ece8e5660`); Authority Building (`3988de35-e263-4374-9935-409f7d8d6c42`); Social Proof (`c07013c7-2324-4ee2-bed5-cbb9199359ef`); PSA / Announcement (`69f0a9a0-8e36-4880-8ba6-5eafbfab506a`); Urgency / Time-Sensitive (`665a61cc-62ae-44a8-b11f-480d1e0addf1`); Shock / Surprise (`c1b1780d-a59c-4d82-bdd3-0ae00e2c2d33`); Numbers / Statistics (`39ea698b-f5aa-4c62-9446-3e29891efbf0`); Scenario / Story (`7405fb5e-3f02-4c3f-8354-39d362923d64`); Surprise Reveals (`b7d8d846-c932-4e2f-b3d1-c036dbb002a6`); Benefit Showcase (`104bdd80-0589-43de-8f3b-ed791b84ff9f`); Problem Identification (`94c926cf-8457-4e0f-bfc1-8fda69863261`); Routine Showcase (`5e99d515-0a9c-4c3a-8baf-37eab565d6ce`); Sales & Promotion (`6834231e-2a20-4166-80de-9c139cdf138b`); Enemy (`d3f8916a-1b06-4f90-8ef9-635533050eb6`); 222 (`cfab704e-d270-4a67-a252-a4a50460b2d2`); THERE'S A NEW ADDITION TO THE L'OREAL PARIS GLASS SKIN RANGE (`30bd8bf8-6e30-49f8-88d1-49cd820c05ca`); THIS IS ACTUALLY PURPLE (`8c036583-88a9-42cc-ba10-eb71f805c9c6`); WE'VE GOT TWO SIZES OF HYALURONIC ACID IN HERE (`963b669d-7261-4753-bcb4-9a1c55682df0`); YOU CAN SEE HOW LIGHTWEIGHT THIS TEXTURE IS (`286dc78d-ed4c-4647-ab3c-8514d5a78f1d`); THIS SHOULD BE THE LAST STEP IN YOUR ROUTINE (`19dd91b6-885e-4f20-b3fc-45bde89c72b2`); YOU CAN GET THE GLASS SKIN LIQUID CREAM + THE GLASS SKIN HYDROGEL GLOW MASK + THE NEW AQUA FLUID SPF 30 ALL IN A BUNDLE (`3528f5d6-90c1-4470-a580-f37b634b72cc`); LIGHTWEIGHT TEXTURE (`42004a1f-a80d-4888-b1bd-cd178c7b28e5`); GLASS SKIN BUNDLE (`239d9552-45a8-45b2-8cd7-6f1df147830d`) |
| Caption | LONG_TEXT | Ks6EM |  |
| Caption Detail | LONG_TEXT | puvcg |  |
| Visual Action Tag | SELECT | aw8mj | multi; Text Overlay (`064a7a40-c66a-4c92-958c-623b8d4d1e21`); Unboxing (Opening Product) (`3cda89f8-e04c-4807-9ce1-fbe5b7ca396e`); Reaction (Genuine Response) (`1c64cd81-afbf-4069-8691-996d2240fb5e`); Transformation (Before/After Reveal) (`5c713dd7-4425-4d5d-9d1c-9771d69e2661`); Lifestyle (Product in Daily Routine) (`f984bded-79fb-4c6b-90ef-5f65a7586150`); Demo (Showing Product Use) (`aeb8e3dc-26d4-41cd-8241-c58ac8ec1626`); Yapping (Talking to Camera) (`a453f3bb-cf0d-4ec2-a2b6-76168f47f39a`); Reading (Looking at Phone/Screen) (`d2981418-bab6-4534-9e74-c19549d11d02`); Walking (Movement Through Space) (`91ffa065-85d4-4174-aad1-e0e299321905`); Pointing (Directing Attention) (`9061b90b-8080-420c-bebb-017bb0352748`); Comparison (Holding Up Two Things) (`9f6f185d-3745-4dad-abd2-16370a5e1005`); Emotional Moment (Vulnerability) (`a15aed63-dfa2-4c87-8d2f-a65aa628b8c7`); Celebration (Excitement/Win) (`135e418f-4195-450d-8dcf-e6cfe72ac28c`); Whispering (Conspiratorial/Secret) (`dfcd4633-c92c-40d8-99b0-a33fd9ec69cc`); Stillness (Pause/Let It Land) (`e18cc96c-72f9-44f8-9319-a5bf0d487789`); Talking Head (`ac76b17d-745d-4e6e-bb9a-d80a4dd9c607`); [Demo (Showing Product Use)] (`523bbb1f-c591-4977-9da5-b023fc6ef8fa`); [Talking Head] (`fb5a9d07-981e-46d8-8e0a-8b9d621ab93a`) |
| Visual Action | LONG_TEXT | O8KFd |  |
| Visual Action Detail | LONG_TEXT | Cyqzh |  |
| Creative Note | LONG_TEXT | gAeK8 |  |
| Timestamp | SINGLE_LINE_TEXT | 0TuwG |  |
| Visual Action Example | FORMULA | 8o0uQ | `IF({Visual Action Tag} = "Talking Head", "https://res.cloudinary.com/dmrekfwpj/image/up...` |
| Shot Example | FORMULA | DMzLF | `IF({Shot Type} = "Full Shot (FS)", "https://res.cloudinary.com/dmrekfwpj/image/upload/v...` |
| Brand | LINKED_RECORD | rT2vM | → Brands (multi) |
| Products | LINKED_RECORD | Uw7A5 | → Products (multi) |
| Script Table | LINKED_RECORD | a0meB | → Script (multi) |
| Screenshot | URL | wRqHF |  |
| Shot | FORMULA | d6Bn6 | `IF({Screenshot} != "", {Screenshot}, {Visual Action Example}) ` |

## Lesson Completions
**Table ID:** `hsDFWXx7nTzEAn`  
**Field count:** 5

| Field | Type | ID | Options / Notes |
|-------|------|----|-----------------|
| Completion | SINGLE_LINE_TEXT | sCtys |  |
| User | LINKED_RECORD | oie3o | → Users |
| Lesson | LINKED_RECORD | ZpVkx | → Lessons |
| Course | LINKED_RECORD | sUNbZ | → Course |
| Completed At | DATETIME | pigYM |  |

