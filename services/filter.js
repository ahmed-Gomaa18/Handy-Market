const filter = (query) => {
    let {search, categories} = query;
  
    let filter = {};
  
    if (search) {
        filter.product_name = { $regex: search, $options: 'i' };
    }
    if (categories) {
        let arrCategories = categories.split(',');
        filter.categories_id = { $in: arrCategories };
    }
    
  
    return filter;
  };
  
module.exports = filter;