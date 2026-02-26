import CyberNav from '../../components/CyberNav';
import BlogCard from '../../components/BlogCard';

export default function BlogsPage() {
  const tags = [
    'Artificial Intelligence',
    'Data Engineering',
    'Product Analysis',
    'Cloud',
  ];

  const posts = [
    {
      id: 1,
      title: 'Understanding Data Analytics',
      date: 'Feb 1, 2025',
      excerpt:
        'A deep dive into modern analytics techniques and tools. Sample text',
    },
    {
      id: 2,
      title: 'Consulting Best Practices',
      date: 'Mar 12, 2025',
      excerpt:
        'How to deliver effective data consulting projects. Sample Text',
    },
    {
      id: 3,
      title: 'Big Data in the Cloud',
      date: 'Apr 25, 2025',
      excerpt:
        'Exploring cloud-based solutions for large datasets. Sample text.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020b1c] via-[#04132d] to-[#020b1c] px-6 py-20 text-white">
      <div className="max-w-7xl mx-auto">
        <CyberNav />

        <div className="mt-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#6fffe9]">Blogs</h1>

          {/* Tag pills */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {tags.map((tag) => (
              <button
                key={tag}
                className="px-4 py-2 rounded-full border border-[#1de9b6]/30 text-[#6fffe9] bg-transparent transform transition-all duration-200 hover:scale-105 hover:shadow-[0_0_25px_#1de9b650] hover:bg-[#062022]"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Latest heading */}
          <h2 className="mt-12 text-3xl font-semibold text-[#6fffe9]">Latest</h2>
        </div>

        {/* Posts grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div key={post.id}>
              <BlogCard title={post.title} date={post.date} excerpt={post.excerpt} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
