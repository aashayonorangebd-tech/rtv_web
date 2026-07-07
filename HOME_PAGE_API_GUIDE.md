# RTV Home Page - Complete API Flow & Data Structure Guide

> This document explains the complete sequential flow of API calls, data processing, and UI rendering for the RTV Flutter app home page. Use this to build a matching web implementation.

---

## Table of Contents

1. [App Flow Overview](#app-flow-overview)
2. [API Call Sequence](#api-call-sequence)
3. [Primary API: Home Template](#1-primary-api-home-template)
4. [Response Structure Deep Dive](#response-structure-deep-dive)
5. [How Sections Are Built](#how-sections-are-built)
6. [UI Rendering Logic](#ui-rendering-logic)
7. [Secondary APIs](#secondary-apis)
8. [Scroll-Triggered Lazy Loading](#scroll-triggered-lazy-loading)
9. [Tab Navigation APIs](#tab-navigation-apis)
10. [Navigation Item Actions](#navigation-item-actions)

---

## App Flow Overview

```
┌─────────────┐
│   Splash    │  (2 seconds)
│  Screen     │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────────┐
│         Home Page Loads             │
│  HomeBinding initializes:           │
│  - HomeController                   │
│  - CommonDataController             │
└──────┬──────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────┐
│  PARALLEL API CALLS (3 requests)    │
│                                     │
│  A. GET Home Template               │
│  B. GET Navigation Data             │
│  C. GET Cities List                 │
└──────┬──────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────┐
│  Home Page Renders                  │
│  - Sections from collectionMap       │
│  - Navigation chips                 │
│  - Drawer menu                      │
└──────┬──────────────────────────────┘
       │
       ▼ (on scroll)
┌─────────────────────────────────────┐
│  Lazy Load More Collections         │
│  (if more sections exist)           │
└─────────────────────────────────────┘
```

---

## API Call Sequence

### Call 1 (FIRST) - Home Template
| Property | Value |
|---|---|
| **Priority** | 1 |
| **When** | `HomeController.onReady()` |
| **Purpose** | Get all sections (collections) with their story order |
| **Critical** | YES - Home page cannot render without this |

### Call 2 (SECOND) - Navigation Data
| Property | Value |
|---|---|
| **Priority** | 2 |
| **When** | `CommonDataController.onReady()` (parallel with Call 1) |
| **Purpose** | Get menu items for bottom nav, drawer, and ribbon |
| **Critical** | NO - UI shows nav chips/menu but home works without it |

### Call 3 (THIRD) - Cities List
| Property | Value |
|---|---|
| **Priority** | 3 |
| **When** | `CommonDataController.onReady()` (parallel with Calls 1 & 2) |
| **Purpose** | Get city list for prayer time and forms |
| **Critical** | NO - Only used in specific features |

### Call 4 (ON SCROLL) - Collection Stories (Lazy Load)
| Property | Value |
|---|---|
| **Priority** | 4 (triggered by scroll) |
| **When** | User scrolls near bottom of loaded sections |
| **Purpose** | Fetch actual stories for sections that weren't loaded initially |
| **Critical** | NO - Only for infinite scroll |

---

## 1. Primary API: Home Template

### Request Details

```
GET https://api.rtvonline.com/api/collection/view/all-active-temp-collection/stories
```

| Field | Value |
|---|---|
| **Method** | GET |
| **Base URL** | `https://api.rtvonline.com` |
| **Endpoint** | `/api/collection/view/all-active-temp-collection/stories` |
| **Headers** | `Content-Type: application/json` |
| **Query Parameters** | None |
| **Body** | None (empty) |
| **Authentication** | None required |

### Called From (Flutter Code)

```dart
// File: lib/app/modules/home/controllers/home_controller.dart

class HomeController extends GetxController {
  @override
  void onReady() {
    loadHomeTemplate();  // ← Called when controller is ready
    super.onReady();
  }

  Future loadHomeTemplate() async {
    var response = await repository.getHomeTemplate();
    // ... handles response
  }
}

// File: lib/app/data/repository/collection_repository.dart

class CollectionRepository extends BaseRepository {
  Future<Either<ErrorResponse, ActiveTemplateCollectionResponse>>
      getHomeTemplate() async {
    return get<ActiveTemplateCollectionResponse>(
      path: Apis.collectionTemp,
      responseCompiler: ActiveTemplateCollectionResponse.fromJson,
    );
  }
}

// File: lib/app/core/constants/apis.dart

static String get collectionTemp =>
    "$_baseUrl/api/collection/view/all-active-temp-collection/stories";
```

---

## Response Structure Deep Dive

### Complete Response Schema

```json
{
  "templateComponentList": [
    {
      "id": 26,
      "title": "comp0",
      "collectionId": 11,        // ← Maps to collection["11"]
      "sequence": 2,              // ← Order on home page
      "activeStatus": true,
      "templateId": 28,
      "componentId": "s1_comp4"
    },
    {
      "id": 30,
      "title": "comp1",
      "collectionId": 41,        // ← Maps to collection["41"]
      "sequence": 3,
      "activeStatus": true,
      "templateId": 28,
      "componentId": "s2_comp1"
    },
    {
      "id": 31,
      "title": "comp2",
      "collectionId": 13,        // ← Maps to collection["13"]
      "sequence": 4,
      "activeStatus": true,
      "templateId": 28,
      "componentId": "s4_comp1"
    },
    {
      "id": 32,
      "title": "comp3",
      "collectionId": 1,         // ← Maps to collection["1"]
      "sequence": 5,
      "activeStatus": true,
      "templateId": 28,
      "componentId": "s6_comp1"
    }
    // ... more components
  ],
  "collection": {
    "1": {
      "storyList": [
        {
          "displayTitle": "জাতীয়",
          "slug": "national",
          "categoryOrder": 2,
          "stories": [
            {
              "storyId": 390227,
              "mainTitle": "১৩ জুলাই বরিশাল যাবেন প্রধানমন্ত্রী",
              "subTitle": "জাতীয় নির্বাচনের পর এই প্রথম আগামী...",
              "datePublished": "2026-07-07T20:45:21.171249",
              "fileName": "https://cdn.rtvonline.com/media/images/2026/7/7/Web-Image---Copy_20260707_204520962.jpg",
              "orderId": 0,
              "passedTime": "০, মিনিট আগে, ঢাকা",
              "isLive": 0,
              "isVideo": 0,
              "canonicalUrl": "https://rtvonline.com/national/390227",
              "langVersion": "BANGLA"
            }
          ]
        }
      ],
      "details": {}
    },
    "11": {
      "storyList": [...],
      "details": {}
    },
    "13": {
      "storyList": [...],
      "details": {}
    },
    "41": {
      "storyList": [...],
      "details": {}
    }
  }
}
```

---

## How Sections Are Built

### Two-Part System

The response has **two arrays** that work together:

### Part 1: `templateComponentList` (The Blueprint)

This defines **what sections exist** and **in what order**:

| id | title | collectionId | sequence | What it means |
|---|---|---|---|---|
| 26 | comp0 | **11** | 2 | Section #1 uses collection 11 |
| 30 | comp1 | **41** | 3 | Section #2 uses collection 41 |
| 31 | comp2 | **13** | 4 | Section #3 uses collection 13 |
| 32 | comp3 | **1** | 5 | Section #4 uses collection 1 |

**Key Insight:** `templateComponentList` is like a table of contents. It says "show collection 11 first, then 41, then 13, then 1".

### Part 2: `collection` (The Content)

This contains the **actual stories** for each collection, keyed by `collectionId`:

```
collection = {
  "1": { storyList: [...] },   // National
  "11": { storyList: [...] },  // Some collection
  "13": { storyList: [...] },  // Special Report
  "41": { storyList: [...] }   // Some collection
}
```

### How They Connect

```dart
// File: lib/app/modules/home/controllers/home_controller.dart

class HomeController extends GetxController {
  final Rx<ActiveTemplateCollectionResponseData?> _template = Rx(null);
  Rx<Map<String, CollectionItem>> collectionMap = Rx({});

  // Sorts template components by sequence
  List<TemplateComponentList> get collectionOrder =>
      (_template.value?.templateComponentList ?? [])
        ..sort((i1, i2) => (i1.sequence ?? 0).compareTo(i2.sequence ?? 0));

  // Returns the CollectionItem for a given index
  CollectionItem? collectionStory(int index) {
    var list = collectionOrder;           // [comp0, comp1, comp2, comp3]
    var length = list.length;             // 4
    var collectionId = list[index].collectionId;  // e.g., "13"
    return collectionMap.value[collectionId.toString()];  // Lookup in collection map
  }
}
```

**Step-by-step for Section 3 (index=2):**

```
1. collectionOrder[0] → collectionId: 11  (sequence: 2)
2. collectionOrder[1] → collectionId: 41  (sequence: 3)
3. collectionOrder[2] → collectionId: 13  (sequence: 4) ← Section 3
4. collectionOrder[3] → collectionId: 1   (sequence: 5)

For index=2:
  collectionId = collectionOrder[2].collectionId = 13
  Lookup: collectionMap.value["13"] → Returns CollectionItem for Special Report
```

---

## UI Rendering Logic

### Home Page ListView

```dart
// File: lib/app/modules/home/views/home_view.dart

ListView.builder(
  itemCount: controller.collectionMap.value.length,  // 4 sections
  itemBuilder: (_, index) {
    var collectionStory = controller.collectionStory(index);
    if (collectionStory?.storyList?.isNotEmpty != true) {
      return const SizedBox();  // Skip empty sections
    }
    return CollectionStories(
      storyList: collectionStory!.storyList!.first,
      sugNewsCont: index == 0 ? 2 : 0,   // ← First section gets 2 sub-highlights
      highlightCount: 1,                   // ← Default: 1 lead story
    );
  },
)
```

### CollectionStories Widget

```dart
// File: lib/app/modules/home/views/widegts/collection_stories.dart

class CollectionStories extends StatelessWidget {
  final StoryList storyList;
  final int? highlightCount;
  final int? sugNewsCont;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // 1. SECTION TITLE (if exists)
        if (storyList.displayTitle != null)
          Container(
            margin: padSym(horizontal: 16, vertical: 16),
            padding: padLR8,
            decoration: BoxDecoration(
              border: Border(left: BorderSide(width: 4, color: secondaryColor.dark)),
            ),
            child: Text(storyList.displayTitle ?? ""),
          ),
        // 2. STORY LIST
        StoryListView(
          listType: storyList.storyListType,
          stories: storyList.stories ?? [],
          highlightCount: highlightCount ?? (storyList.displayTitle != null ? 1 : 2),
          subNewsCount: sugNewsCont,
        ),
      ],
    );
  }
}
```

### StoryListView (The Actual Renderer)

```dart
// File: lib/app/modules/home/views/widegts/story_list.dart

class StoryListView extends StatelessWidget {
  final List<StoryListItem> stories;
  final int highlightCount;
  final String? listType;
  final int? subNewsCount;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // 1. LEAD NEWS (highlightCount stories as big hero cards)
        ...stories.sublist(0, highlightCount).map((story) {
          return HomeHighlightCard(story: story, type: listType);
        }),

        // 2. SUB-HIGHLIGHTS (subNewsCount stories in 2-column row)
        if (subNewsCount != null && subNewsCount! > 0)
          Padding(
            padding: padSym(horizontal: 16, vertical: 8),
            child: Row(
              children: stories
                  .sublist(highlightCount, highlightCount + (subNewsCount ?? 0))
                  .asMap()
                  .entries
                  .map((entry) {
                final index = entry.key;
                final story = entry.value;
                return Expanded(
                  child: Padding(
                    padding: EdgeInsets.only(left: index == 0 ? 0 : 12),
                    child: HomeSubHighlightCard(story: story, type: listType),
                  ),
                );
              }).toList(),
            ),
          ),

        // 3. OTHER NEWS (remaining stories as horizontal list items)
        ...stories.sublist(highlightCount + (subNewsCount ?? 0)).map((story) {
          return HomeStoryItemCard(story: story, type: listType);
        })
      ],
    );
  }
}
```

---

## Section-by-Section Display (Real Data)

### Actual Data from API

**4 sections** have data:

| Section | Index | collectionId | displayTitle | Story Count | highlightCount | subNewsCount |
|---|---|---|---|---|---|---|
| 1 | 0 | 11 | *(none)* | 16 | **2** | **2** |
| 2 | 1 | 41 | *(none)* | 14 | **2** | **0** |
| 3 | 2 | 13 | **বিশেষ প্রতিবেদন** | 11 | **1** | **0** |
| 4 | 3 | 1 | **জাতীয়** | 16 | **1** | **0** |

### How highlightCount is Determined

```dart
highlightCount: highlightCount ?? (storyList.displayTitle != null ? 1 : 2)
```

| Condition | Result |
|---|---|
| `displayTitle` is NOT null (has title) | `highlightCount = 1` |
| `displayTitle` is null (no title) | `highlightCount = 2` |
| Explicitly passed | Uses explicit value |

### How subNewsCount is Determined

```dart
sugNewsCont: index == 0 ? 2 : 0
```

| Condition | Result |
|---|---|
| `index == 0` (first section) | `subNewsCount = 2` |
| `index != 0` | `subNewsCount = 0` |

---

## Section 3 Deep Dive: "বিশেষ প্রতিবেদন"

### Why This Section Exists

```
templateComponentList[2]:
  - id: 31
  - collectionId: 13
  - sequence: 4
  - componentId: "s4_comp1"
```

This tells the app: "At position 4 in the home page, show the content from collection ID 13".

### Where Collection 13 Comes From

The `collection["13"]` object is part of the **same API response** from Call 1. It's not fetched separately.

### Exact Data for Section 3

```json
{
  "13": {
    "storyList": [
      {
        "displayTitle": "বিশেষ প্রতিবেদন",
        "slug": "special-report",
        "categoryOrder": 2,
        "stories": [
          {
            "storyId": 390218,
            "mainTitle": "বাড়ির আঙিনাতেই দৌড়াচ্ছে ২৯টি চিত্রা হরিণ!",
            "subTitle": "প্রথম দেখায় মনে হতে পারে, এটি কোনো চিড়িয়াখানা...",
            "fileName": "https://cdn.rtvonline.com/media/images/2026/7/7/20_20260707_193954143.jpg",
            "orderId": 0,
            "isLive": 0,
            "isVideo": 1,
            "passedTime": "০, মিনিট আগে, ঢাকা"
          },
          {
            "storyId": 390214,
            "mainTitle": "যেখানে বৃষ্টি নয়, কুয়াশাই মেটাচ্ছে পানির চাহিদা!",
            "subTitle": "এখন যে মরু শহরটি দেখছেন...",
            "fileName": "https://cdn.rtvonline.com/media/images/2026/7/7/19_20260707_192925305.jpg",
            "orderId": 0,
            "isLive": 0,
            "isVideo": 1,
            "passedTime": "১০, মিনিট আগে, ঢাকা"
          },
          {
            "storyId": 389078,
            "mainTitle": "শয়তানের সাগর! যেখানে ঢুকলে আর ফিরে আসে না কেউ!",
            "subTitle": "জাহাজ থেকে বিমান, সবকিছুই নাকি গায়েব হয়ে যায়...",
            "fileName": "https://cdn.rtvonline.com/media/images/2026/7/1/12_20260701_202321204.jpg",
            "orderId": 0,
            "isLive": 0,
            "isVideo": 1,
            "passedTime": "বুধবার, ০১ জুলাই ২০২৬ ০৮:২৩ পিএম, ঢাকা"
          },
          {
            "storyId": 388853,
            "mainTitle": "কোলে গন্ধগোকুল, পেছনে সজারু কে এই বাস্তবের 'ডিজনি প্রিনেসেস'?",
            "subTitle": "ছোট্ট ছোট্ট পায়ে সরু মেঠোপথ ধরে...",
            "fileName": "https://cdn.rtvonline.com/media/images/2026/7/30/25_20260630_194922525.jpg",
            "orderId": 0,
            "isLive": 0,
            "isVideo": 1,
            "passedTime": "মঙ্গলবার, ৩০ জুন ২০২৬ ০৭:৪৯ পিএম, ঢাকা"
          },
          {
            "storyId": 388436,
            "mainTitle": "ইসরায়েলিদের চোখে যুদ্ধে 'জয়ী' হয়েছে ইরান!",
            "subTitle": "যে যুদ্ধকে ইসরায়েলের জন্য ঐতিহাসিক সাফল্য...",
            "fileName": "https://cdn.rtvonline.com/media/images/2026/7/28/20_20260628_144401007.jpg",
            "orderId": 0,
            "isLive": 0,
            "isVideo": 1,
            "passedTime": "রোববার, ২৮ জুন ২০২৬ ০২:৪৪ পিএম, ঢাকা"
          },
          {
            "storyId": 388283,
            "mainTitle": "ইরানের পর এবার পরবর্তী টার্গেট ঠিক করলো ইসরায়েল!",
            "subTitle": "আগামী ১৫ বছরের মধ্যেই মিসরের সঙ্গে যুদ্ধে...",
            "fileName": "https://cdn.rtvonline.com/media/images/2026/7/27/22_20260627_152047976.jpg",
            "orderId": 0,
            "isLive": 0,
            "isVideo": 1,
            "passedTime": "শনিবার, ২৭ জুন ২০২৬ ০৩:২০ পিএম, ঢাকা"
          },
          {
            "storyId": 388170,
            "mainTitle": "স্ট্রেস কমাতে পাহাড়ে ঝুলছেন তরুণেরা",
            "subTitle": "অফিসের চাপ, ডেডলাইন, মোবাইলের নোটিফিকেশন...",
            "fileName": "https://cdn.rtvonline.com/media/images/2026/7/26/16_20260626_200425906.jpg",
            "orderId": 0,
            "isLive": 0,
            "isVideo": 1,
            "passedTime": "শুক্রবার, ২৬ জুন ২০২৬ ০৮:০৪ পিএম, ঢাকা"
          },
          {
            "storyId": 388060,
            "mainTitle": "যেভাবে এআই দিয়ে রাশিয়ার সামরিক সরঞ্জাম ধ্বংস করছে ইউক্রেন!",
            "subTitle": "রুশ সেনারা শত্রু খুঁজছিলেন সামনের দিকে...",
            "fileName": "https://cdn.rtvonline.com/media/images/2026/7/25/15_20260625_231521269.jpg",
            "orderId": 0,
            "isLive": 0,
            "isVideo": 1,
            "passedTime": "বৃহস্পতিবার, ২৫ জুন ২০২৬ ১১:১৫ পিএম, ঢাকা"
          },
          {
            "storyId": 388059,
            "mainTitle": "জন্ম এক দেশে হলেও অন্য দেশের হয়ে বিশ্বকাপ জিতেছেন যে ২২ ফুটবলার",
            "subTitle": "জন্ম আর্জেন্টিনায়, কিন্তু বিশ্বকাপ জিতেছেন ইতালির হয়ে...",
            "fileName": "https://cdn.rtvonline.com/media/images/2026/7/25/14_20260625_230852679.jpg",
            "orderId": 0,
            "isLive": 0,
            "isVideo": 1,
            "passedTime": "বৃহস্পতিবার, ২৫ জুন ২০২৬ ১১:০৮ পিএম, ঢাকা"
          },
          {
            "storyId": 387806,
            "mainTitle": "ছয় সপ্তাহের বিক্ষোভে কাঁপছে বলিভিয়া, সেনা নামিয়ে জারি জরুরি অবস্থা!",
            "subTitle": "কখনো কখনো একটি দেশের সংকট এতটাই গভীর...",
            "fileName": "https://cdn.rtvonline.com/media/images/2026/7/24/15_20260624_232556022.jpg",
            "orderId": 0,
            "isLive": 0,
            "isVideo": 1,
            "passedTime": "বুধবার, ২৪ জুন ২০২৬ ১১:২৫ পিএম, ঢাকা"
          }
        ]
      }
    ],
    "details": {}
  }
}
```

**Total: 11 stories in this section**

---

## Section 3 UI Breakdown

### Section Header
```
┌─────────────────────────────┐
│ ▎ বিশেষ প্রতিবেদন           │
└─────────────────────────────┘
```
- Left border: 4px solid `secondaryColor.dark` (red)
- Padding: 8px left
- Text: `storyList.displayTitle`

### Lead News (1 story - HomeHighlightCard)

```
┌─────────────────────────────────────────────────┐
│ ┌─────────────────────────────────────────────┐ │
│ │                                             │ │
│ │          [Image: 20_20260707_193954143.jpg] │ │
│ │                                             │ │
│ │              ▶ (play button overlay)        │ │
│ │                                             │ │
│ └─────────────────────────────────────────────┘ │
│ বাড়ির আঙিনাতেই দৌড়াচ্ছে ২৯টি চিত্রা হরিণ!    │
│                                                   │
│ প্রথম দেখায় মনে হতে পারে, এটি কোনো চিড়িয়াখানা।  │
│ আবার কারও চোখে হয়তো ধরা দিতে পারে বনের এক...   │
└─────────────────────────────────────────────────┘
```

**Card specs:**
- Aspect ratio: 16:10
- Border radius: 12px
- Border: 1px solid neutralColor.color300
- Shadow: subtle (opacity 0.04)
- Title: fontSize 24, fontWeight 700
- Subtitle: fontSize 15, maxLines 6
- **Video badge**: `isVideo: 1` shows play button overlay

### Other News (10 stories - HomeStoryItemCard)

Each renders as:
```
┌──────────────────────────────────────────────────┐
│ ┌──────────┐  বাড়ির আঙিনাতেই দৌড়াচ্ছে ২৯টি    │
│ │          │  চিত্রা হরিণ!                        │
│ │  [Image] │                                      │
│ │    ▶     │  প্রথম দেখায় মনে হতে পারে, এটি...   │
│ └──────────┘                                      │
└──────────────────────────────────────────────────┘
```

**Card specs:**
- Image width: 150px (desktop) / 132px (mobile)
- Image aspect: 1.59:1
- Title: fontSize 16, fontWeight 700, maxLines 3
- Subtitle: fontSize 14, maxLines 2
- Border radius: 10px
- Padding: 12px

### Complete Section 3 UI

```
┌──────────────────────────────────────────────────────────┐
│ ▎ বিশেষ প্রতিবেদন                                        │
├──────────────────────────────────────────────────────────┤
│ ┌──────────────────────────────────────────────────────┐ │
│ │                                                      │ │
│ │              [Image: ছোট্ট ছোট্ট চিত্রা হরিণের ছবি]   │ │
│ │                         ▶                           │ │
│ │                                                      │ │
│ └──────────────────────────────────────────────────────┘ │
│ বাড়ির আঙিনাতেই দৌড়াচ্ছে ২৯টি চিত্রা হরিণ!             │
│ প্রথম দেখায় মনে হতে পারে, এটি কোনো চিড়িয়াখানা...       │
├──────────────────────────────────────────────────────────┤
│ ┌────────────┬─────────────────────────────────────────┐ │
│ │  [Image]   │ যেখানে বৃষ্টি নয়, কুয়াশাই মেটাচ্ছে    │ │
│ │    ▶       │ পানির চাহিদা!                          │ │
│ │            │ এখন যে মরু শহরটি দেখছেন...              │ │
│ └────────────┴─────────────────────────────────────────┘ │
├──────────────────────────────────────────────────────────┤
│ ┌────────────┬─────────────────────────────────────────┐ │
│ │  [Image]   │ শয়তানের সাগর! যেখানে ঢুকলে আর ফিরে  │ │
│ │    ▶       │ আসে না কেউ!                            │ │
│ │            │ জাহাজ থেকে বিমান, সবকিছুই নাকি...       │ │
│ └────────────┴─────────────────────────────────────────┘ │
├──────────────────────────────────────────────────────────┤
│ ┌────────────┬─────────────────────────────────────────┐ │
│ │  [Image]   │ কোলে গন্ধগোকুল, পেছনে সজারু কে এই    │ │
│ │    ▶       │ বাস্তবের 'ডিজনি প্রিনেসেস'?           │ │
│ │            │ ছোট্ট ছোট্ট পায়ে সরু মেঠোপথ ধরে...     │ │
│ └────────────┴─────────────────────────────────────────┘ │
├──────────────────────────────────────────────────────────┤
│ [Image] ইসরায়েলিদের চোখে যুদ্ধে 'জয়ী' হয়েছে ইরান!     │
├──────────────────────────────────────────────────────────┤
│ [Image] ইরানের পর এবার পরবর্তী টার্গেট ঠিক করলো...     │
├──────────────────────────────────────────────────────────┤
│ [Image] স্ট্রেস কমাতে পাহাড়ে ঝুলছেন তরুণেরা            │
├──────────────────────────────────────────────────────────┤
│ [Image] যেভাবে এআই দিয়ে রাশিয়ার সামরিক সরঞ্জাম ধ্বংস... │
├──────────────────────────────────────────────────────────┤
│ [Image] জন্ম এক দেশে হলেও অন্য দেশের হয়ে বিশ্বকাপ...     │
├──────────────────────────────────────────────────────────┤
│ [Image] ছয় সপ্তাহের বিক্ষোভে কাঁপছে বলিভিয়া...          │
└──────────────────────────────────────────────────────────┘
```

---

## Secondary APIs

### Call 2: Navigation Data

```
GET https://api.rtvonline.com/api/navigation
```

| Field | Value |
|---|---|
| **Called From** | `CommonDataController.onReady()` |
| **Query Params** | None |
| **Body** | None |
| **Used For** | Bottom nav chips, drawer menu, footer links |

### Call 3: Cities List

```
GET https://api.rtvonline.com/api/utils/Bangladesh/cities
```

| Field | Value |
|---|---|
| **Called From** | `CommonDataController.onReady()` → `loadCities()` |
| **Query Params** | None (country name in path) |
| **Body** | None |
| **Used For** | City dropdown in prayer time, contact forms |

---

## Scroll-Triggered Lazy Loading

### When Does It Trigger?

```dart
// File: lib/app/modules/home/controllers/home_controller.dart

CollectionItem? collectionStory(int index) {
  var list = collectionOrder;
  var length = list.length;
  if (index == collectionMap.value.length - 2 &&   // Near end
      index < length - 2 &&                          // More sections exist
      !isLoading) {                                  // Not already loading
    int index2 = collectionMap.value.length;
    var collectionToLoad = [
      list[index2].collectionId,
      if (index2 + 1 < length) list[index2 + 1].collectionId
    ];
    addNewCollection(collectionToLoad);
  }
  return collectionMap.value[list[index].collectionId!.toString()];
}
```

### The API Call

```
GET https://api.rtvonline.com/api/collection/view/collection/stories?collections={id1},{id2}
```

| Field | Value |
|---|---|
| **Method** | GET |
| **Endpoint** | `/api/collection/view/collection/stories` |
| **Query Params** | `collections` (comma-separated collection IDs) |
| **Body** | None |
| **Called From** | `HomeController.addNewCollection()` |

### Response

```json
{
  "collection": {
    "5": {
      "storyList": [...],
      "details": {}
    },
    "6": {
      "storyList": [...],
      "details": {}
    }
  }
}
```

**Note:** This response does NOT include `templateComponentList`. Only the `collection` map with the requested IDs.

---

## Tab Navigation APIs

### Latest Stories Tab

```
GET https://api.rtvonline.com/api/story/view/latest-tab
```

| Field | Value |
|---|---|
| **Called From** | `LatestStoriesController.onInit()` → `loadLatestTab()` |
| **Query Params** | None |
| **Body** | None |
| **Response** | `LatestStoryResponse` with paginated stories |

### Popular Reads Tab

```
GET https://api.rtvonline.com/api/story/view/popular-page?page={page}&size=20
```

| Field | Value |
|---|---|
| **Called From** | `PopularPageController.onReady()` → `loadLatestTab()` |
| **Query Params** | `page` (current page), `size` (default 20) |
| **Body** | None |
| **Response** | `PopularPageResponseModel` with paginated stories |

---

## Navigation Item Actions

When user taps a navigation chip or drawer item:

| navigationItemType | Endpoint | Query Params |
|---|---|---|
| `CATEGORY` | `/api/category/view/{categoryId}/stories` | `page`, `size=20` |
| `TAG` | `/api/tag/view/{tagId}/stories` | `page` |
| `SLUG` | `/api/category/view/header/{slug}` | `page`, `size=20` |
| `LINK` | External URL (opens in browser) | None |
| Others | Routes to `StoryListView` with type/id | None |

---

## Data Flow Summary

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. APP STARTS                                                   │
│    SplashController → 2s delay → Navigate to Home               │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ 2. HOME BINDING LOADS                                           │
│    - HomeController                                             │
│    - CommonDataController                                       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ 3. PARALLEL API CALLS                                           │
│    ┌─────────────────────────────────────────────────────────┐ │
│    │ CALL 1: GET Home Template                               │ │
│    │ https://api.rtvonline.com/api/collection/view/           │ │
│    │   all-active-temp-collection/stories                    │ │
│    │                                                         │ │
│    │ Response:                                               │ │
│    │ {                                                       │ │
│    │   "templateComponentList": [                            │ │
│    │     { "collectionId": 11, "sequence": 2 },              │ │
│    │     { "collectionId": 41, "sequence": 3 },              │ │
│    │     { "collectionId": 13, "sequence": 4 },              │ │
│    │     { "collectionId": 1, "sequence": 5 }                │ │
│    │   ],                                                    │ │
│    │   "collection": {                                       │ │
│    │     "11": { "storyList": [...] },                       │ │
│    │     "41": { "storyList": [...] },                       │ │
│    │     "13": { "storyList": [...] },                       │ │
│    │     "1": { "storyList": [...] }                         │ │
│    │   }                                                     │ │
│    │ }                                                       │ │
│    └─────────────────────────────────────────────────────────┘ │
│    ┌─────────────────────────────────────────────────────────┐ │
│    │ CALL 2: GET Navigation                                  │ │
│    │ https://api.rtvonline.com/api/navigation                │ │
│    │                                                         │ │
│    │ Response: {                                             │ │
│    │   "menuList": [...],                                    │ │
│    │   "ribbonResponseDtoList": [...],                       │ │
│    │   "footerList": [...]                                   │ │
│    │ }                                                       │ │
│    └─────────────────────────────────────────────────────────┘ │
│    ┌─────────────────────────────────────────────────────────┐ │
│    │ CALL 3: GET Cities                                      │ │
│    │ https://api.rtvonline.com/api/utils/Bangladesh/cities   │ │
│    │                                                         │ │
│    │ Response: { "items": ["Dhaka", "Chittagong", ...] }     │ │
│    └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ 4. DATA PROCESSING                                             │
│    - templateComponentList sorted by sequence                  │
│    - collectionMap populated with CollectionItem objects       │
│    - Each CollectionItem contains:                             │
│      - storyList[] (array of StoryList objects)                │
│      - details (metadata)                                      │
│    - StoryList contains:                                       │
│      - displayTitle (section title)                            │
│      - stories[] (array of StoryListItem)                      │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ 5. UI RENDERS                                                  │
│    ListView.builder iterates collectionMap:                    │
│    For each collection:                                        │
│      - Extract displayTitle (or null if no title)              │
│      - Determine highlightCount:                               │
│        * displayTitle != null → 1 lead story                  │
│        * displayTitle == null → 2 lead stories                │
│      - Determine subNewsCount:                                 │
│        * index == 0 → 2 sub-highlights                        │
│        * else → 0                                             │
│      - Render:                                                 │
│        * Section title (if displayTitle exists)                │
│        * highlightCount × HomeHighlightCard                    │
│        * subNewsCount × HomeSubHighlightCard (2-col grid)      │
│        * Remaining × HomeStoryItemCard (horizontal list)       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ 6. ON SCROLL (if more sections exist)                          │
│    GET /api/collection/view/collection/stories                 │
│      ?collections={nextId1},{nextId2}                          │
│    Response adds to collectionMap                              │
└─────────────────────────────────────────────────────────────────┘
```

---

## Story Object Reference

```dart
class StoryListItem {
  int? storyId;           // Unique story ID
  String? mainTitle;      // Main headline
  String? subTitle;       // Short description/excerpt
  String? datePublished;  // ISO datetime
  String? fileName;       // Image URL
  int? orderId;           // Display order within section
  String? passedTime;     // Human-readable time (e.g., "২, মিনিট আগে")
  int? isLive;            // 1 = live, 0 = not live
  int? isVideo;           // 1 = video, 0 = not video
  String? canonicalUrl;   // Full story URL
  String? langVersion;    // "BANGLA" or "ENGLISH"
}
```

---

## Story List Object Reference

```dart
class StoryList {
  String? displayTitle;       // Section title (e.g., "বিশেষ প্রতিবেদন")
  String? slug;               // URL slug (e.g., "special-report")
  int? categoryOrder;         // Sort order
  String? storyListType;      // Type identifier
  List<StoryListItem>? stories; // Array of stories
}
```

---

## Collection Item Reference

```dart
class CollectionItem {
  List<StoryList>? storyList;  // Array of story lists
  Details? details;            // Metadata (currently empty)
}
```

---

## Quick Reference: Section Configuration

| Section | collectionId | displayTitle | Stories | Lead | Sub | Total Cards |
|---|---|---|---|---|---|---|
| 1 | 11 | *(none)* | 16 | 2 | 2 | 2 heroes + 2 sub + 12 list |
| 2 | 41 | *(none)* | 14 | 2 | 0 | 2 heroes + 12 list |
| 3 | 13 | **বিশেষ প্রতিবেদন** | 11 | 1 | 0 | 1 hero + 10 list |
| 4 | 1 | **জাতীয়** | 16 | 1 | 0 | 1 hero + 15 list |

---

## Key Takeaways for Web Development

1. **Single API call** gets all sections and their stories
2. **`templateComponentList`** determines section order
3. **`collection`** map contains actual story data keyed by `collectionId`
4. **Section title** comes from `storyList.displayTitle`
5. **Lead story count** = 2 if no title, 1 if title exists
6. **Sub-highlights** = 2 only for the first section
7. **Remaining stories** render as horizontal list items
8. **Video indicator** = `isVideo: 1` shows play button overlay
9. **Live indicator** = `isLive: 1` shows "LIVE" badge
10. **Scroll loading** only triggers if more template components exist than loaded collections

---

*Generated from RTV Flutter App codebase analysis*
*Base URL: https://api.rtvonline.com*
