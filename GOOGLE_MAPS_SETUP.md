# Google Maps Setup Guide

## Overview

The property add form now uses Google Maps for location selection with autocomplete search functionality restricted to Nigeria.

## Setup Instructions

### 1. Get a Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable the following APIs:
   - Maps JavaScript API
   - Places API
   - Geocoding API
4. Create an API key (Credentials → Create Credentials → API Key)
5. Restrict the key to:
   - Application Restrictions: HTTP referrers
   - Add your domain (e.g., localhost:3000 for development, your production domain)
   - API restrictions: Select the three APIs mentioned above

### 2. Add Google Maps Script to Your App

Add the Google Maps script to your `app/layout.tsx`:

```tsx
import Script from "next/script";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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

### 3. Add Environment Variables

Create or update your `.env.local` file:

```
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
```

**Important:** The `NEXT_PUBLIC_` prefix makes it accessible in the browser.

### 4. Features

The MapComponent provides:

- **Address Search**: Search for addresses in Nigeria with autocomplete
- **Drag and Drop**: Drag the marker to adjust location
- **Click to Set**: Click anywhere on the map to set a new location
- **Geocoding**: Converts addresses to coordinates and vice versa
- **Nigeria-Specific**: Search is restricted to Nigeria by default

### 5. Usage in Components

```tsx
import { MapComponent } from "@/components/MapComponent";

<MapComponent
  address={formData.fullAddress}
  onLocationChange={(coords) => {
    // Update your form state
    setFormData({
      ...formData,
      latitude: coords.latitude,
      longitude: coords.longitude,
      fullAddress: coords.address,
    });
  }}
/>;
```

### 6. Troubleshooting

**Map not appearing?**

- Check that Google Maps script is loaded in browser DevTools (Network tab)
- Verify API key is correct and has correct restrictions
- Ensure API key has Maps JavaScript API and Places API enabled

**Autocomplete not working?**

- Make sure Places API is enabled in Google Cloud Console
- Check API key restrictions allow your domain
- Check browser console for CORS errors

**Getting 403 error?**

- Verify the API key is correct
- Check that the domain is whitelisted in API key restrictions
- Ensure all required APIs are enabled

## Cost Considerations

Google Maps API usage is metered:

- Maps display is $7 per 1000 loads
- Geocoding: $5 per 1000 requests
- Places Autocomplete: $2.83 per 1000 requests (with session tokens)

For production, consider implementing session tokens in the MapComponent to reduce costs.
