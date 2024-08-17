import React, { useRef, useEffect } from 'react';

export const GoogleMapAutocomplete = ({ onSelect }) => {
  const autocompleteRef = useRef(null);

  useEffect(() => {
    const autocomplete = new window.google.maps.places.Autocomplete(autocompleteRef.current, {
      types: ['address'],
      componentRestrictions: { country: 'us' },
    });
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      onSelect(place.formatted_address);
    });
  }, [onSelect]);

  return (
    <input
      ref={autocompleteRef}
      type="text"
      placeholder="Enter your address"
    />
  );
};
