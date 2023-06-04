import { Grid } from 'react-loader-spinner';

export default function LoadingSpinner() {
  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center", minHeight: 300}}>
      <Grid
        height="40"
        width="40"
        color="#1976d2"
        ariaLabel="grid-loading"
        radius="12.5"
        visible={true}
      />
    </div>
  )
}

