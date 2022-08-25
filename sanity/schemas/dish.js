export default {
  name: "dish",
  title: "Dish",
  type: "document",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Name of dish",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "sort_description",
      type: "string",
      title: "Sort Description of dish",
      validation: (Rule) => Rule.max(200),
    },
    {
      name: "price",
      type: "number",
      title: "Price of the dish in INR",
    },
    {
      name: "image",
      type: "image",
      title: "Image of the Dish  ",
    },
  ],
};
