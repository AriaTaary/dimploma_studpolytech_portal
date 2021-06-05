import moment from "moment";

export default {
  article (item) {
    const categories = [];

    item.categories.forEach(
      function (category) {
        categories.push(
          {
            slug: category.slug,
            name: category.name
          }
        )
      }
    )

    return {
      id: item.id,
      author: item.author,
      title: item.title,
      cut: item.cut,
      text: item.text,
      created_at: moment(item.created_at).format('llll'),
      categories: categories,
      views: item.views,
      rating: item.rating,
      saved: item.saved,
      rating_users: item.rating_users,
      saved_users: item.saved_users,
    };
  }
}
