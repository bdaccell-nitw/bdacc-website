export default function MemberCard({
  name,
  role,
  image,
  linkedin,
  github,
}) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition">
      <img
        src={image}
        alt={name}
        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
      />

      <h3 className="text-lg font-semibold text-gray-800">
        {name}
      </h3>

      <p className="text-sm text-gray-500 mb-4">
        {role}
      </p>

      <div className="flex justify-center gap-4 text-sm">
        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:underline"
          >
            LinkedIn
          </a>
        )}

        {github && (
          <a
            href={github}
            target="_blank"
            rel="noreferrer"
            className="text-gray-700 hover:underline"
          >
            GitHub
          </a>
        )}
      </div>
    </div>
  );
}
