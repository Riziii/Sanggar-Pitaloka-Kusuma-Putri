# Security Specification — Sanggar Pitaloka Kusuma Putri

## 1. Data Invariants
1. **Single-Document Public Testimonials Board**: `/testimonials_board/{boardId}` only permits `boardId == 'public_feed'`, strictly enforces `boardId`, `items`, and `updatedAt == request.time`, and caps `items.size() <= 50`.
2. **Single-Document Public Gallery Board**: `/gallery_board/{boardId}` only permits `boardId == 'public_gallery'`, strictly enforces `boardId`, `items`, and `updatedAt == request.time`, caps `items.size() <= 12`, and validates the structure and string lengths of `items[0]` when non-empty.
3. **Zero Unbounded List Queries**: `allow list: if false;` on all collections to eliminate query scraping and O(n) read costs.
4. **Immutable Board Identifiers**: During updates to `/testimonials_board/public_feed` or `/gallery_board/public_gallery`, `incoming().boardId == existing().boardId` and `affectedKeys().hasOnly(['items', 'updatedAt'])`.

## 2. The "Dirty Dozen" Payloads
1. Extra shadow key `isAdmin: true` on `/testimonials_board/public_feed` -> DENIED by `hasOnly`.
2. Extra shadow key `featured: true` on `/gallery_board/public_gallery` -> DENIED by `hasOnly`.
3. Invalid document ID `/gallery_board/other_gallery` -> DENIED by `boardId == 'public_gallery'`.
4. Client-spoofed `updatedAt` timestamp not matching `request.time` -> DENIED by `data.updatedAt == request.time`.
5. Oversized `items` list (`size() > 12`) in `/gallery_board/public_gallery` -> DENIED by `data.items.size() <= 12`.
6. Oversized image payload (`image.size() > 250000`) in `items[0]` -> DENIED by `item.image.size() <= 250000`.
7. Mutating `boardId` during `update` -> DENIED by `incoming().boardId == existing().boardId` and `affectedKeys().hasOnly(['items', 'updatedAt'])`.
8. Unverified email attempting `/admins/{uid}` read -> DENIED by `isVerifiedUser()`.
9. Deleting `/testimonials_board/public_feed` or `/gallery_board/public_gallery` -> DENIED by `allow delete: if false`.
10. Listing `/gallery_board` collection -> DENIED by `allow list: if false`.
11. Missing required key `description` in `items[0]` of `/gallery_board/public_gallery` -> DENIED by `item.keys().hasAll(...)`.
12. Wrong type (`items: "not-a-list"`) -> DENIED by `data.items is list`.
