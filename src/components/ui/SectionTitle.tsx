interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  gradient?: boolean;
}

export function SectionTitle({
  title,
  subtitle,
  centered = true,
  gradient = true,
}: SectionTitleProps) {
  return (
    <div className={centered ? "text-center" : ""}>
      <h2 className={`section-title ${gradient ? "gradient-text" : ""}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`section-subtitle mt-3 ${centered ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
