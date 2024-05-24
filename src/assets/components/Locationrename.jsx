import { useState } from 'react';
import axios from 'axios';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';


const LocationFinder = () => {
    const [address, setAddress] = useState('');
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/location', {
                params: { address }
            });
            if (response.data.status === 'OK' && response.data.results.length > 0) {
                setLocation(response.data.results[0].geometry.location);
                setError(null);
            } else {
                setError('No results found. Please try a different address.');
                setLocation(null);
            }
        } catch (error) {
            setError('Error fetching location data');
            console.error('Error fetching location data', error);
        }
    };

    return (
        <div>
            <h1 className='text-center mt-10 text-red-500 font-semibold text-4xl'>Location Finder</h1>

                <div className='text-center mt-4'>
                            <div className='flex-initial'>
                                 <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Enter address or location"
                                    className='appearance-none  w-80 px-3 py-2 border border-gray-300 rounded-md shadow-sm text-center'
                                    />
                            </div>

                            <div className='text-center mt-5'>
                                    <button onClick={handleSearch} className='w-90 border p-2 px-5 font-semibold rounded-xl text-blue-500 text-xl'>Search</button>
                            </div>
                </div>



               
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {location && (
                <div>
                        <div className='w-full max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 mb-4'>
                                    <table className="min-w-full bg-white border border-gray-300">
                                                <thead>
                                                    <tr>
                                                        <th className="py-2 px-4 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-600">Latitude</th>
                                                        <th className="py-2 px-4 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-600">Longitude</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-700">{location.lat}</td>
                                                        <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-700">{location.lng}</td>
                                                    </tr>
                                                </tbody>
                                    </table>
                        </div>

                            <div className='w-full max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6'>
                                    <LoadScript googleMapsApiKey="AIzaSyAVoFPJ4JqyrOk51tk4L_TN7g7d012r8yE">
                                        <GoogleMap
                                            mapContainerStyle={{ width: '660px', height: '400px' }}
                                            center={location}
                                            zoom={15}
                                        >
                                            <Marker position={location} />
                                        </GoogleMap>
                                    </LoadScript>
                            </div>
                        
                               
                        
                </div>
            )}
        </div>
    );
};

export default LocationFinder;
