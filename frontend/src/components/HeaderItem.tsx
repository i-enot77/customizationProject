import React from "react";

interface HeaderItemProps {
  headerContent: string;
  headerClass?: string;
  headerWrapper?: string;
  content: string;
  contentClass?: string;
}

const HeaderItem: React.FC<HeaderItemProps> = ({
  headerContent,
  headerClass = "",
  headerWrapper = "",
  content,
  contentClass = "",
}) => {
  return (
    <div className={`flex-initial py-4 lg:px-5 ${headerWrapper}`}>
      {/* get width and order from wrapper prop */}
      <h2 className={`text-3xl ${headerClass}`}>{headerContent}</h2>
      <p className={`w-full ${contentClass}`}>{content}</p>
    </div>
  );
};

export default HeaderItem;
