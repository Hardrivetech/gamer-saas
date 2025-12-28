'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, updateProfile, User } from 'firebase/auth';
import { auth } from '../firebase';
import { Camera, Loader2 } from 'lucide-react';

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [displayName, setDisplayName] = useState('');
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push('/login');
      } else {
        setUser(currentUser);
        setDisplayName(currentUser.displayName || '');
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setUploading(true);
    setMessage('');

    // --- Cloudinary Upload Logic ---
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );
      const data = await response.json();
      
      // Apply Cloudinary transformations: Crop to square (1:1), auto-focus on subject, resize to 500px
      let photoURL = data.secure_url;
      if (photoURL && photoURL.includes('/upload/')) {
        const [baseUrl, imagePath] = photoURL.split('/upload/');
        photoURL = `${baseUrl}/upload/c_fill,ar_1:1,g_auto,w_auto/${imagePath}`;
      }

      // Update the user's profile
      await updateProfile(user, { photoURL });
      
      // Force refresh user state to update UI immediately
      // Note: We create a new object to trigger React re-render
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setUser({ ...user, photoURL } as any);
      setMessage('Profile picture updated successfully!');
    } catch (error) {
      console.error(error);
      setMessage('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleSaveName = async () => {
    if (!user) return;
    setMessage('');
    
    try {
      await updateProfile(user, { displayName });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setUser({ ...user, displayName } as any);
      setMessage('Display name updated successfully!');
    } catch (error) {
      console.error(error);
      setMessage('Failed to update display name.');
    }
  };

  if (loading) return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-2xl mx-auto mt-12 bg-slate-800 p-8 rounded-xl border border-slate-700">
        <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
        
        <div className="flex flex-col items-center gap-6">
          <div className="relative group">
            {user?.photoURL ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img 
                src={user.photoURL} 
                alt="Profile" 
                className="w-32 h-32 rounded-full object-cover border-4 border-slate-700"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-orange-600 flex items-center justify-center text-4xl font-bold">
                {user?.email?.charAt(0).toUpperCase()}
              </div>
            )}
            
            <label className="absolute bottom-0 right-0 bg-slate-900 p-2 rounded-full border border-slate-600 cursor-pointer hover:bg-slate-700 transition-colors">
              <Camera className="w-5 h-5 text-slate-300" />
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleImageUpload}
                disabled={uploading}
              />
            </label>
          </div>

          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4">{user?.email}</h2>
            
            <div className="flex flex-col gap-3 w-full max-w-xs mx-auto mb-4">
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Set a display name"
                className="bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-orange-500 outline-none transition-all"
              />
              <button 
                onClick={handleSaveName}
                className="bg-slate-700 hover:bg-slate-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Update Name
              </button>
            </div>

            <p className="text-slate-400 text-sm">Member since {user?.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'Unknown'}</p>
          </div>

          {uploading && (
            <div className="flex items-center gap-2 text-orange-400">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Uploading...</span>
            </div>
          )}
          
          {message && (
            <p className={`text-sm ${message.includes('Failed') ? 'text-red-400' : 'text-green-400'}`}>
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
