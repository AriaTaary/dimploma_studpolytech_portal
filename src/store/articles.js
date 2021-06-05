import api from '@/network/api'
import moment from 'moment'

export default {
  actions: {
    async getArticles(
      { rootGetters },
      request = null
    ) {
      let response = await api.getAllArticles(rootGetters.getAuthToken, request)

      if (response.status === 200) {
        this.count = response.data.length

        if (this.count !== 0) {
          const parsedArticles = []

          response.data.forEach(function (article, key, articles) {
            const categories = []

            article.categories.forEach(
              function (category, categoryKey, categoriesArray) {
                categories.push(
                  {
                    slug: category.slug,
                    name: category.name
                  }
                )
              }
            )

            const rating_users = []

            article.rating_users.forEach(
              function (rating_user, rating_usersKey, rating_usersArray) {
                rating_users.push(
                  {
                    id: rating_user.id,
                    user_id: rating_user.user_id,
                    article_id: rating_user.article_id,
                    rating: rating_user.rating,
                    created_at: rating_user.created_at,
                    updated_at: rating_user.updated_at
                  }
                )
              }
            )

            let ratingTag = null;
            const userTag = rootGetters.getUser.id;

            article.rating_users.forEach(
              function (rating_user, rating_usersKey, rating_usersArray) {
                if (rating_user.id === userTag) {
                  ratingTag = 1;
                }
            })

            let saveTag = null;

            article.saved_users.forEach(
              function (saved_user, saved_usersKey, saved_usersArray) {
                if (saved_user.id === userTag) {
                  saveTag = 1;
                }
              })

            parsedArticles.push({
              id: article.id,
              author: article.author.username,
              title: article.title,
              cut: article.cut,
              created_at: moment(article.created_at).format('llll'),
              categories: categories,
              views: article.views,
              rating: article.rating,
              saved: article.saved,
              rating_users: rating_users,
              rating_user: ratingTag,
              saved_user: saveTag,
            })
          })

          return parsedArticles
        }
        else {
          return []
        }
      }
      else {
        alert("Произошла ошибка")
      }
    },
    async getCategories({ rootGetters }) {
        let response = await api.getAllArticleCategories(rootGetters.getAuthToken)

        if (response.status === 200) {
          this.count = response.data.length

          if (this.count !== 0) {
            const parsedCategories = []

            response.data.forEach(function (category, key, categories) {

              parsedCategories.push({
                id: category.id,
                name: category.name,
              })
            })

            return parsedCategories
          }
          else {
            return []
          }
        }
        else {
          alert("Произошла ошибка")
        }
    },
    async getSavedArticle(
      { rootGetters },
      article_id = null,
    ) {
      const response = await api.saveArticle(rootGetters.getAuthToken, article_id);

      if (response.status === 200) {

          let article = {};

          const categories = []

          response.data.categories.forEach(
            function (category, categoryKey, categoriesArray) {
              categories.push(
                {
                  slug: category.slug,
                  name: category.name
                }
              )
            }
          )

          const rating_users = []

          response.data.rating_users.forEach(
            function (rating_user, rating_usersKey, rating_usersArray) {
              rating_users.push(
                {
                  id: rating_user.id,
                  user_id: rating_user.user_id,
                  article_id: rating_user.article_id,
                  rating: rating_user.rating,
                  created_at: rating_user.created_at,
                  updated_at: rating_user.updated_at
                }
              )
            }
          )

          let ratingTag = null;
          const userTag = rootGetters.getUser.id;

          response.data.rating_users.forEach(
            function (rating_user, rating_usersKey, rating_usersArray) {
              if (rating_user.user_id === userTag) {
                ratingTag = 1;
              }
            })

          let saveTag = null;

          response.data.saved_users.forEach(
            function (saved_user, saved_usersKey, saved_usersArray) {
              if (saved_user.id === userTag) {
                saveTag = 1;
              }
            })

            article.id = response.data.id;
            article.author = response.data.author.username;
            article.title = response.data.title;
            article.cut = response.data.cut;
            article.created_at = moment(response.data.created_at).format('llll');
            article.categories = categories;
            article.views = response.data.views;
            article.rating = response.data.rating;
            article.saved = response.data.saved;
            article.rating_users = rating_users;
            article.rating_user = ratingTag;
            article.saved_user = saveTag;

        return article
      }
      else {
        alert("Произошла ошибка")
      }
    },
    async getLikedArticle(
      { rootGetters },
      response = null
    ) {
      // console.log(ratingTag);
      // const response = await api.ratingArticle(rootGetters.getAuthToken, article_id, ratingTag);
      // console.log(response);

      if (response.status === 200) {

        let article = {};

        const categories = []

        response.data.categories.forEach(
          function (category, categoryKey, categoriesArray) {
            categories.push(
              {
                slug: category.slug,
                name: category.name
              }
            )
          }
        )

        const rating_users = []

        response.data.rating_users.forEach(
          function (rating_user, rating_usersKey, rating_usersArray) {
            rating_users.push(
              {
                id: rating_user.id,
                user_id: rating_user.user_id,
                article_id: rating_user.article_id,
                rating: rating_user.rating,
                created_at: rating_user.created_at,
                updated_at: rating_user.updated_at
              }
            )
          }
        )

        let ratingTag = null;
        const userTag = rootGetters.getUser.id;

        response.data.rating_users.forEach(
          function (rating_user, rating_usersKey, rating_usersArray) {
            if (rating_user.user_id === userTag) {
              ratingTag = 1;
            }
          })

        let saveTag = null;

        response.data.saved_users.forEach(
          function (saved_user, saved_usersKey, saved_usersArray) {
            if (saved_user.id === userTag) {
              saveTag = 1;
            }
          })

        article.id = response.data.id;
        article.author = response.data.author.username;
        article.title = response.data.title;
        article.cut = response.data.cut;
        article.created_at = moment(response.data.created_at).format('llll');
        article.categories = categories;
        article.views = response.data.views;
        article.rating = response.data.rating;
        article.saved = response.data.saved;
        article.rating_users = rating_users;
        article.rating_user = ratingTag;
        article.saved_user = saveTag;

        return article
      }
      else {
        alert("Произошла ошибка")
      }
    },
  }
}
