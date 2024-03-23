interface SimpleLink {
  type: "link";
  label: string;
  to: string;
}

interface DropdownLink {
  type: "dropdown";
  label: string;
  items: SimpleLink[];
}

export type NavigationLink = SimpleLink | DropdownLink;

const navigationLinks: NavigationLink[] = [
  {
    type: "link",
    label: "Home",
    to: "/",
  },
  {
    type: "dropdown",
    label: "Categories",
    items: [
      { type: "link", label: "Category 1", to: "/category1" },
      { type: "link", label: "Category 2", to: "/category2" },
    ],
  },
  {
    type: "link",
    label: "Contact Us",
    to: "/contact",
  },
];

export default navigationLinks;
