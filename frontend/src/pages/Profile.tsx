import { useState, useEffect } from 'react';
import { profileApi, type ProfileResponse } from '../entities/profile';

export const ProfilePage = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [profile, setProfile] = useState<ProfileResponse | null>(null);

  const getProfile = async () => {
    const [err, data] = await profileApi.getProfile();
    if (err) {
      setError(err.message);
    } else {
      setError(null);
      setProfile(data);
    }

    console.log('====================================');
    console.log('Profile data:', data);
    console.log('====================================');
    setLoading(false);
  };

  useEffect(() => {
    getProfile();
  }, []);

  if (loading) {
    return (
      <div className="max-w-xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Error</h1>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">My Profile</h1>
      <div className="bg-white shadow rounded-xl p-4 space-y-2">
        <p>
          <strong>Email:</strong> {profile?.email}
        </p>
        <p>
          <strong>Role:</strong> {profile?.role}
        </p>
      </div>
    </div>
  );
};
