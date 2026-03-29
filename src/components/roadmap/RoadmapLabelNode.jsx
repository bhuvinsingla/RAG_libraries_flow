export function RoadmapLabelNode({ data }) {
  return (
    <div className={`roadmap-col-label roadmap-col-label--${data.track}`}>
      {data.label}
    </div>
  )
}
