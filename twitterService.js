import fetch from 'node-fetch';

export const getTextWithoutMediaURL = (text) => {
  const wordsArray = text.split(' ');
  const textWithoutMedia = wordsArray.map((word) =>
    word.includes('https://t.co') ? '' : word
  );
  return textWithoutMedia.join(' ');
};

export const getFirstTweet = async (id) => {
  const res = await fetch(
    `https://api.twitter.com/2/tweets/?ids=${id}&expansions=attachments.media_keys,author_id&media.fields=preview_image_url,url&user.fields=profile_image_url`,
    {
      headers: {
        Authorization: `Bearer ${process.env['BEARER_TOKEN_2']}`
      }
    }
  ).then((response) => {
    return response.json();
  });
  const media = res?.includes?.media || [];
  return {
    text: getTextWithoutMediaURL(res?.data[0]?.text) || '',
    media: media,
    profile_url: res?.includes?.users[0]?.profile_image_url,
    name: res?.includes?.users[0]?.name,
    username: res?.includes?.users[0]?.username,
    id: res?.data[0]?.id
  };
};

export const getTweetsInThread = async (id, username) => {
  const res = await fetch(
    `https://api.twitter.com/2/tweets/search/recent?query=conversation_id:${id} from:${username} to:${username}&tweet.fields=in_reply_to_user_id,author_id,created_at,id&expansions=attachments.media_keys&media.fields=preview_image_url,url&max_results=100`,
    {
      headers: {
        Authorization: `Bearer ${process.env['BEARER_TOKEN_2']}`
      }
    }
  ).then((response) => {
    return response.json();
  });
  console.log(res);
  return res;
};
