import React, { useRef, useState, useCallback } from "react"

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeLabel = "Before",
  afterLabel = "After",
  defaultPosition = 50,
}) {
  const containerRef = useRef(null)
  const [position, setPosition] = useState(defaultPosition)
  const [dragging, setDragging] = useState(false)

  const getPosition = useCallback((clientX) => {
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    return (x / rect.width) * 100
  }, [])

  const onMouseDown = (e) => {
    e.preventDefault()
    setDragging(true)
  }

  const onMouseMove = useCallback((e) => {
    if (!dragging) return
    setPosition(getPosition(e.clientX))
  }, [dragging, getPosition])

  const onMouseUp = useCallback(() => setDragging(false), [])

  const onTouchMove = useCallback((e) => {
    setPosition(getPosition(e.touches[0].clientX))
  }, [getPosition])

  return (
    <div
      ref={containerRef}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchMove={onTouchMove}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        borderRadius: "inherit",
        cursor: dragging ? "col-resize" : "default",
        userSelect: "none",
      }}
    >
      {/* After image (base layer) */}
      <img
        src={afterSrc}
        alt={afterLabel}
        draggable={false}
        width={1200}
        height={750}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
      />

      {/* Before image (clipped) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          clipPath: `inset(0 ${100 - position}% 0 0)`,
        }}
      >
        <img
          src={beforeSrc}
          alt={beforeLabel}
          draggable={false}
          width={1200}
          height={750}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* Divider line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: `${position}%`,
          transform: "translateX(-50%)",
          width: "2px",
          background: "rgba(255,255,255,0.9)",
          pointerEvents: "none",
        }}
      />

      {/* Drag handle */}
      <div
        onMouseDown={onMouseDown}
        onTouchStart={(e) => { setDragging(true); setPosition(getPosition(e.touches[0].clientX)) }}
        onTouchEnd={() => setDragging(false)}
        style={{
          position: "absolute",
          top: "50%",
          left: `${position}%`,
          transform: "translate(-50%, -50%)",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          background: "white",
          boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "col-resize",
          zIndex: 10,
        }}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M6 4L2 9L6 14M12 4L16 9L12 14" stroke="#333" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Labels */}
      <span style={{
        position: "absolute",
        top: "1rem",
        left: "1rem",
        fontSize: "0.65rem",
        fontWeight: 600,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "white",
        background: "rgba(0,0,0,0.45)",
        padding: "0.25rem 0.6rem",
        borderRadius: "999px",
        pointerEvents: "none",
      }}>
        {beforeLabel}
      </span>
      <span style={{
        position: "absolute",
        top: "1rem",
        right: "1rem",
        fontSize: "0.65rem",
        fontWeight: 600,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "white",
        background: "rgba(0,0,0,0.45)",
        padding: "0.25rem 0.6rem",
        borderRadius: "999px",
        pointerEvents: "none",
      }}>
        {afterLabel}
      </span>
    </div>
  )
}
