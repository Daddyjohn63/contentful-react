import { useState, useEffect } from 'react';
import { createClient } from 'contentful'; //run npm install contentful to access this.

const client = createClient({
  space: 'mpnuwuy798dz',
  environment: 'master',
  accessToken: '2IYxCQ3EOYPHO3YMFSiZEdqcmyCNd5e2txlBQ3OyH7E'
});

export const useFetchProjects = () => {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);

  const getData = async () => {
    try {
      //items is the name of each object in the array of objects returned from Contentful.
      const response = await client.getEntries({ content_type: 'projects' }); //getEntries() is a method provided by Contentful.
      const projects = response.items.map(item => {
        const { title, url, image } = item.fields;
        const id = item.sys.id;
        const img = image?.fields?.file?.url;
        return { title, url, id, img };
      });

      setProjects(projects);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return { loading, projects };
};
