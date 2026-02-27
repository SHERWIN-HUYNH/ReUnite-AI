import { MissingPost } from "@/types/interface";
import PersonCard from "./PersonCard";
import { AlertCircle, Users } from "lucide-react";

interface ListPeopleProps {
  ListPosts: MissingPost[];
}

// Helper function to calculate age consistently
const calculateAge = (dob: string | null | undefined): number => {
  if (!dob) return 0;
  
  const dobDate = new Date(dob);
  const today = new Date();
  const age = today.getFullYear() - dobDate.getFullYear();
  const monthDiff = today.getMonth() - dobDate.getMonth();
  
  // Adjust if birthday hasn't occurred this year
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
    return age - 1;
  }
  return age;
};

const ListPeople = ({ ListPosts }: ListPeopleProps) => {
  return (
    <div className="space-y-8">
      {/* Results Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-gray-200 dark:border-slate-700">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-lg">
            <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Missing Person Reports
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {ListPosts.length} {ListPosts.length === 1 ? 'result' : 'results'} found
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600 dark:text-gray-400 font-medium">Sort by:</label>
          <select className="border border-gray-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm font-medium text-indigo-700 dark:text-indigo-400 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all">
            <option>Most Recent</option>
            <option>Time Missing</option>
            <option>Alphabetical</option>
          </select>
        </div>
      </div>

      {/* Results Grid */}
      {ListPosts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-4">
          <div className="bg-gray-100 dark:bg-slate-800 rounded-full p-6 mb-4">
            <AlertCircle className="w-16 h-16 text-gray-400 dark:text-gray-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No Results Found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
            We couldn't find any missing persons matching your search criteria. Try adjusting your filters or search terms.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {ListPosts.map((post: MissingPost, index: number) => {
            const age = calculateAge(post.dob);
            
            const imageUrl = post.images.length > 0
              ? (post.images.find(img => img.is_avatar)?.url || post.images[0].url)
              : '/assets/images/missing_people/person1.png';

            return (
              <PersonCard
                id={post.id_}
                key={post.id_ || index} 
                name={post.name}
                age={age}
                gender={post.gender}
                lastSeen={post.address || "Unknown"} 
                dateMissing={post.missing_since}
                description={post.description || "No description provided"}
                imageUrl={imageUrl} 
                missing_since={post.missing_since}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
export default ListPeople;
