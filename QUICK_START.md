# Quick Start: Property Form with Google Maps

## Files Created/Modified

### New Files:

1. **`lib/constants/nigeria.ts`** - All Nigerian states and cities
2. **`components/MapComponent.tsx`** - Reusable Google Maps component
3. **`GOOGLE_MAPS_SETUP.md`** - Detailed setup guide
4. **`PROPERTY_FORM_CHANGES.md`** - Complete changes documentation
5. **`.env.local.example`** - Environment variable template
6. **`setup-maps.sh`** - Quick setup script

### Modified Files:

1. **`app/admin/property/add/page.tsx`** - Updated form with:
   - Dynamic state/city selectors
   - Integrated Google Maps
   - Latitude/longitude capture

## 3-Step Quick Setup

### Step 1: Get Google Maps API Key

```
https://console.cloud.google.com/
→ Create project
→ Enable: Maps JS API, Places API, Geocoding API
→ Create API Key
→ Restrict to your domain
```

### Step 2: Add Environment Variable

```bash
# In .env.local
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key_here
```

### Step 3: Update Root Layout

```tsx
// app/layout.tsx
import Script from "next/script";

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places,geocoding`}
          strategy="lazyOnload"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

## Features

✨ **State/City Selection**

- 36 Nigerian states + FCT
- Dynamic city population based on state
- Clean, cascading dropdown UX

🗺️ **Google Maps Integration**

- Search address with autocomplete
- Drag-and-drop marker positioning
- Click on map to set location
- Automatic coordinate capture
- Nigeria-restricted search

📍 **Location Data**

- State code
- City code
- Full address
- Latitude/Longitude coordinates

## Testing

1. Start dev server: `npm run dev`
2. Navigate to: `http://localhost:3000/admin/property/add`
3. In Step 2 (Location):
   - Select a state (e.g., Lagos)
   - Select a city (e.g., Ikeja)
   - Type an address and select from dropdown
   - Drag marker or click map to adjust
   - Coordinates are captured automatically

## Troubleshooting

❌ **Map not showing?**

- Verify Google Maps script is in layout.tsx
- Check API key in .env.local
- Verify APIs are enabled in Google Cloud

❌ **Search not working?**

- Ensure Places API is enabled
- Check domain is whitelisted in API restrictions
- Look for CORS errors in console

❌ **Getting undefined errors?**

- Verify all imports are correct
- Check Nigeria constants are being imported
- Ensure MapComponent is in components folder

## Cost Optimization

For production, consider:

- Using session tokens to reduce API calls
- Implementing caching for frequent addresses
- Adding request throttling
- Using different API key for backend operations

## Next Steps

- Integrate with property list view to show locations
- Add property map view for buyer browsing
- Add batch geocoding for existing properties
- Add property clustering on map
