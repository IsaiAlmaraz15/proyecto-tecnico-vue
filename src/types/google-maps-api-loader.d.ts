declare module 'google-maps-api-loader' {
  interface GoogleMapsApiLoaderOptions {
    libraries?: string[]
    apiKey?: string
    client?: string
    channel?: string
    language?: string
    region?: string
    version?: string
  }

  interface GoogleMapsApiLoader {
    (options: GoogleMapsApiLoaderOptions): Promise<typeof google>
  }

  const googleMapsApiLoader: GoogleMapsApiLoader
  export default googleMapsApiLoader
}
