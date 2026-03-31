import { Layout } from "../components/Layout";

interface LegalPlaceholderPageProps {
  basePath: string;
  title: string;
  description?: string;
}

export default function LegalPlaceholderPage({
  basePath,
  title,
  description,
}: LegalPlaceholderPageProps) {
  return (
    <Layout basePath={basePath}>
      <section className="flex min-h-[60vh] items-center justify-center bg-background py-20">
        <div className="min-w-0 max-w-full px-4 text-center break-words">
          <h1 className="text-3xl font-bold text-nail-queen-brown sm:text-4xl mb-6">{title}</h1>
          {description && <p className="text-gray-600 mb-8 max-w-2xl mx-auto">{description}</p>}
          <p className="text-gray-500">
            This page is coming soon. Please continue prompting to fill in the content for this page.
          </p>
        </div>
      </section>
    </Layout>
  );
}
