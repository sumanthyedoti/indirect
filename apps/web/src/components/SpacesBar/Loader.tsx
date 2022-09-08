import ContentLoader from 'react-content-loader'

const Loader = (props: any) => {
  return (
    <ContentLoader
      viewBox="0 0 100% 100%"
      backgroundColor="#aaa"
      foregroundColor="#888"
      {...props}
    >
      <rect x="5" y="5" rx="5" ry="5" width="44" height="44" />
      <rect x="5" y="58" rx="5" ry="5" width="44" height="44" />
      <rect x="5" y="115" rx="5" ry="5" width="44" height="44" />
    </ContentLoader>
  )
}

export default Loader
