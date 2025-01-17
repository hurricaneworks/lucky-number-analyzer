import { Helmet } from 'react-helmet';

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
}

const SEO = ({ 
  title = "UK Lottery Number Analyzer - Check Your Lottery Numbers Statistics",
  description = "Free UK lottery number analyzer tool. Check historical statistics, winning patterns, and odds for Lotto and EuroMillions numbers. Make informed choices for your lottery picks.",
  path = ""
}: SEOProps) => {
  const baseUrl = "https://lovable.dev/projects/b0a53b35-bebb-4d0c-957e-07762397eb24";
  const url = `${baseUrl}${path}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};

export default SEO;