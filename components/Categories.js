import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import CategoryCard from "./CategoryCard";
import sanityClient, { urlFor } from "../sanity";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "category"]
     `
      )
      .then((data) => {
        setCategories(data);
      });
  }, []);

  // console.log(categories);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator="false"
      contentContainerStyle={{ paddingTop: 10, paddingHorizontal: 15 }}
    >
      {categories.map((category) => (
        <CategoryCard
          key={category._id}
          imageUrl={urlFor(category.image).width(200).url()}
          title={category.title}
        />
      ))}
    </ScrollView>
  );
};

export default Categories;

const styles = StyleSheet.create({});
