"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface MapComponentProps {
  address: string;
  onLocationChange: (coords: {
    latitude: number;
    longitude: number;
    address: string;
  }) => void;
}

declare global {
  interface Window {
    google: any;
  }
}

export function MapComponent({ address, onLocationChange }: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [marker, setMarker] = useState<any>(null);
  const [autocompleteService, setAutocompleteService] = useState<any>(null);
  const [searchAddress, setSearchAddress] = useState(address);
  const [suggestions, setSuggestions] = useState<any[]>([]);

  // Initialize Google Maps
  useEffect(() => {
    const loadGoogleMaps = async () => {
      if (typeof window !== "undefined" && window.google) {
        if (mapRef.current) {
          const newMap = new window.google.maps.Map(mapRef.current, {
            zoom: 10,
            center: { lat: 6.5244, lng: 3.3792 }, // Default to Lagos, Nigeria
            mapTypeControl: true,
            fullscreenControl: false,
            zoomControl: true,
            streetViewControl: false,
          });

          const newMarker = new window.google.maps.Marker({
            map: newMap,
            position: { lat: 6.5244, lng: 3.3792 },
            draggable: true,
          });

          // Listen for marker drag events
          newMarker.addListener("dragend", () => {
            const position = newMarker.getPosition();
            onLocationChange({
              latitude: position.lat(),
              longitude: position.lng(),
              address: searchAddress,
            });
          });

          // Listen for map click events
          newMap.addListener("click", (event: any) => {
            const lat = event.latLng.lat();
            const lng = event.latLng.lng();
            newMarker.setPosition({ lat, lng });
            onLocationChange({
              latitude: lat,
              longitude: lng,
              address: searchAddress,
            });
          });

          setMap(newMap);
          setMarker(newMarker);

          // Initialize autocomplete service
          const service = new window.google.maps.places.AutocompleteService();
          setAutocompleteService(service);

          // If address is provided, try to geocode it
          if (address) {
            geocodeAddress(newMap, address, newMarker);
          }
        }
      }
    };

    const script = document.querySelector('script[src*="maps.googleapis.com"]');
    if (script) {
      loadGoogleMaps();
    }
  }, []);

  const geocodeAddress = (map: any, addr: string, markerToUpdate: any) => {
    if (!window.google) return;

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode(
      { address: addr + ", Nigeria" },
      (results: any, status: string) => {
        if (status === "OK" && results[0]) {
          const location = results[0].geometry.location;
          map.setCenter(location);
          map.setZoom(15);
          markerToUpdate.setPosition(location);

          onLocationChange({
            latitude: location.lat(),
            longitude: location.lng(),
            address: results[0].formatted_address,
          });
        }
      },
    );
  };

  const handleAddressSearch = (value: string) => {
    setSearchAddress(value);

    if (value.length > 2 && autocompleteService) {
      autocompleteService.getPlacePredictions(
        {
          input: value,
          componentRestrictions: { country: "ng" },
        },
        (predictions: any) => {
          setSuggestions(predictions || []);
        },
      );
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: any) => {
    setSearchAddress(suggestion.description);
    setSuggestions([]);

    if (map && marker) {
      geocodeAddress(map, suggestion.description, marker);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label className="label-sm font-semibold text-[#36393f]">
          Search Address (Nigeria)
        </Label>
        <div className="relative">
          <Input
            type="text"
            placeholder="Search address..."
            value={searchAddress}
            onChange={(e) => handleAddressSearch(e.target.value)}
            className="h-10 rounded-lg px-4 py-2.5 border-none bg-[#f5f5f5] text-[#0e0e0f] placeholder:text-[#6B7280] body-sm"
          />
          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-[#e7e8ea] rounded-lg shadow-lg max-h-60 overflow-auto">
              {suggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full text-left px-4 py-2.5 hover:bg-[#f5f5f5] border-b border-[#e7e8ea] last:border-0 body-sm text-[#36393f]"
                >
                  {suggestion.description}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label className="label-sm font-semibold text-[#36393f]">
          Map Pin (Drag marker or click on map to set location)
        </Label>
        <div
          ref={mapRef}
          className="w-full h-[300px] rounded-lg bg-[#f5f5f5] border border-[#e7e8ea]"
        />
      </div>
    </div>
  );
}
