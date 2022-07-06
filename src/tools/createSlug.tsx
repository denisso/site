export const createSlug =  (str: string) => {
    let slug = str
      .normalize('NFKD')
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .trim()
      .replace(/[-\s]+/g, '-');
    if(slug.length > 100) slug = str.slice(0, 100)
    return slug
  };