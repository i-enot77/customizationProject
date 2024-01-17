function SectionItem({ sectionClass, children }) {
  return (
    <section
      className={`flex justify-between items-end flex-wrap w-full ${sectionClass}`}
    >
      {children}
    </section>

    // <section
    //   className={`flex justify-between flex-wrap w-full ${sectionClass}`}
    // >
    //   {/*get width and order from wrapper prop */}
    //   <div className={`flex-initial ${headerWrapper}`}>
    //     <HeaderItem headerContent={headerContent} />
    //     <ContentItem content={content} />
    //   </div>
    //   <div className={`flex-initial ${mediaWrapper}`}>
    //     <ResponsiveImage small={small} medium={medium} large={large} />
    //   </div>
    // </section>
  );
}

export default SectionItem;
