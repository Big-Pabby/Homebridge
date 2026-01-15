import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';

const PropertyListingTable = () => {
  const [selectedRows, setSelectedRows] = useState(new Set());

  const properties = [
    {
      id: 1,
      name: 'Orchid Villa',
      location: 'Lekki, Lagos',
      type: 'Land',
      price: '₦85M',
      paymentType: 'Full Payment',
      views: 123,
      dateListed: '20 Nov, 2025',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Orchid Villa',
      location: 'Lekki, Lagos',
      type: 'House',
      price: '₦85M',
      paymentType: 'Installment',
      views: 123,
      dateListed: '20 Nov, 2025',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Orchid Villa',
      location: 'Lekki, Lagos',
      type: 'House',
      price: '₦85M',
      paymentType: 'Installment',
      views: 123,
      dateListed: '20 Nov, 2025',
      status: 'Active'
    },
    {
      id: 4,
      name: 'Orchid Villa',
      location: 'Lekki, Lagos',
      type: 'House',
      price: '₦85M',
      paymentType: 'Full Payment',
      views: 123,
      dateListed: '20 Nov, 2025',
      status: 'Sold out'
    }
  ];

  const toggleSelectAll = () => {
    if (selectedRows.size === properties.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(properties.map(p => p.id)));
    }
  };

  const toggleSelectRow = (id: number) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  const allSelected = selectedRows.size === properties.length && properties.length > 0;
  const someSelected = selectedRows.size > 0 && selectedRows.size < properties.length;

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-white rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg text-gray-800 font-semibold">Active Listing</h2>
        <Button variant="outline" className="flex bg-transparent! bg-none! items-center gap-2">
          Monthly
          <ChevronDown className="w-4 h-4" />
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="border-b">
            <TableHead className="w-12">
              <Checkbox
                checked={allSelected}
                onCheckedChange={toggleSelectAll}
                aria-label="Select all"
                className={someSelected ? "data-[state=checked]:bg-primary" : ""}
              />
            </TableHead>
            <TableHead className="font-medium text-gray-600">Property</TableHead>
            <TableHead className="font-medium text-gray-600">Type</TableHead>
            <TableHead className="font-medium text-gray-600">Price</TableHead>
            <TableHead className="font-medium text-gray-600">Views</TableHead>
            <TableHead className="font-medium text-gray-600">Date Listed</TableHead>
            <TableHead className="font-medium text-gray-600">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {properties.map((property) => (
            <TableRow key={property.id} className="border-b hover:bg-gray-50">
              <TableCell>
                <Checkbox
                  checked={selectedRows.has(property.id)}
                  onCheckedChange={() => toggleSelectRow(property.id)}
                  aria-label={`Select ${property.name}`}
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-500"> <Image
                          src="/properties/orchid-villa.jpg"
                          alt={property.name}
                          width={32}
                          height={32}
                          className="rounded-full w-full h-full object-cover"
                        /></div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{property.name}</div>
                    <div className="text-sm text-gray-500">{property.location}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-gray-700">{property.type}</TableCell>
              <TableCell>
                <div>
                  <div className="font-semibold text-gray-900">{property.price}</div>
                  <div className="text-sm text-gray-500">{property.paymentType}</div>
                </div>
              </TableCell>
              <TableCell className="text-gray-700">{property.views}</TableCell>
              <TableCell className="text-gray-700">{property.dateListed}</TableCell>
              <TableCell>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    property.status === 'Active'
                      ? 'bg-green-50 text-green-600'
                      : 'bg-red-50 text-red-600'
                  }`}
                >
                  {property.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PropertyListingTable;