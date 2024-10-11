'use client'

import React, { ReactNode, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { LatLngTuple } from 'leaflet';
import { setLayers, toggleLayerSelection } from '@/store/actions/mapSlice';
import { LayerType } from '@/utils/types';
import { LayersControl } from 'react-leaflet';

interface MapWithTileLayerProps {
  initialPosition: LatLngTuple;
  tileURL: string;
  children: ReactNode;
}

const MapWithTileLayer = ({ initialPosition, tileURL, children }: MapWithTileLayerProps) => {
  const props = {
    initialPosition,
    tileURL,
    children,
  };

  return <MapWithTileLayerView {...props}>{children}</MapWithTileLayerView>;
};

const MapWithTileLayerView = ({ initialPosition, tileURL, children }: any) => {
  const dispatch = useDispatch();
  const layers = useSelector((state: RootState) => state.map.layers);

  const handleLayerToggle = (index: number) => {
    dispatch(toggleLayerSelection(index));
  };

  const handleAddLayer = () => {
    const newLayer: LayerType = {
      overlay: LayersControl.Overlay,
      name: `Layer ${layers.length + 1}`,
      isSelected: false,
    };
    dispatch(setLayers(newLayer));
  };

  return (
    <div className="flex flex-row w-full min-h-screen">
      <div className="w-1/4 p-4 bg-gray-100 h-full shadow-md">
        <h2 className="text-2xl font-bold mb-4">Layers Control</h2>
        <div className="mb-4">
          {layers.map((layer, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={layer.isSelected}
                onChange={() => handleLayerToggle(index)}
                className="mr-2"
              />
              <span>{layer.name}</span>
            </div>
          ))}
        </div>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleAddLayer}
        >
          + Add Layer
        </button>
      </div>
      <div className="flex-1">
        <MapContainer center={initialPosition} zoom={13} style={{ width: '100%', height: '550px' }}>
          <TileLayer url={tileURL} />
          {children}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapWithTileLayer;