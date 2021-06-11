import moment from "moment";

const prepare = {
  user(item) {
    return {
      id: item.id,
      username: item.username,
      avatar: prepare.file(item.avatar),
      last_name: item.last_name,
      first_name: item.first_name,
      middle_name: item.middle_name,
      key_skills: item.key_skills,
      about: item.about,
      created_at: moment(item.created_at).format('ll'),
      date_birth: item.date_birth,
      language: item.language,
      language_level: item.language_level,
      phone: item.phone,
      gender: item.gender,
      email: item.email,
    };
  },
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
      created_at: moment(item.created_at).format('ll'),
      categories: categories,
      views: item.views,
      rating: item.rating,
      saved: item.saved,
      rating_users: item.rating_users,
      saved_users: item.saved_users,
      source: item.source,
      image: prepare.file(item.image),
    };
  },
  file(item) {
    return {
      id: item.id,
      filename: item.filename,
      content_type: item.content_type,
      byte_size: item.byte_size,
      base64: item.base64,
      created_at: item.created_at,
      updated_at: item.updated_at,
    }
  },
  news(item) {
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
      created_at: moment(item.created_at).format('ll'),
      categories: categories,
      views: item.views
    };
  },
  vacancy(item) {
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

    const responses = [];

    item.responses.forEach(
      function (user) {
        responses.push(prepare.user(user));
      }
    )

    return {
      id: item.id,
      author: item.author,
      title: item.title,
      description: item.common_description,
      requirements_description: item.requirements_description,
      condition_description: item.condition_description,
      employment_type: item.employment_type,
      needed_work_experience: item.needed_work_experience,
      work_schedule: item.work_schedule,
      city: item.city,
      company_name: item.company_name,
      company_address: item.company_address,
      company_email: item.company_email,
      company_phone: item.company_phone,
      company_site: item.company_site,
      created_at: moment(item.created_at).format('ll'),
      categories: categories,
      saved: item.saved,
      saved_users: item.saved_users,
      responses: responses,
      salary: item.salary
    };
  },
}

export default prepare;
