import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      friendCount
      friends {
        _id
        username
      }
      posted {
        _id
        postText
        postAuthor
        likeCount
        commentCount
        createdAt
        comments {
          commentAuthor
          commentText
          createdAt
          _id
        }
      }
    }
  }
`;

export const QUERY_POST = gql`
query Query($postId: ID!) {
  post(postId: $postId) {
    _id
    postText
    postAuthor
    createdAt
    likeCount
    commentCount
    likedBy {
      _id
    }
    comments {
      _id
      commentText
      commentAuthor
      createdAt
    }
  }
}
`

export const QUERY_POSTS = gql`
  query posts {
    posts {
      postText
      postAuthor
      _id
      createdAt
      likeCount
      commentCount
      likedBy {
        _id
      }
      comments {
        commentAuthor
        commentText
        createdAt
        _id
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      friendCount
      friends {
        _id
      }
      posted {
        _id
        postText
        postAuthor
        likeCount
        commentCount
        createdAt
        comments {
          commentAuthor
          commentText
          createdAt
          _id
        }
      }
    }
  }
`;

export const QUERY_LIKED = gql `
query Liked {
  liked {
    liked {
      _id
      postText
      postAuthor
      createdAt
      likeCount
      commentCount
      likedBy {
        _id
      }
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
}
`;

export const QUERY_USERPROFILE = gql`
query Query($userId: ID!) {
  friendProfile(userId: $userId) {
    _id
    username
    email
    friendCount
    friends {
      _id
      username
    }
    posted {
      _id
      postText
      postAuthor
      likeCount
      commentCount
      createdAt
      comments {
        commentAuthor
        commentText
        createdAt
        _id
      }
    }
  }
}
`;

export const QUERY_USERS = gql`
query{
  users {
    username
    _id
    email
    posted {
      _id
      postText
      postAuthor
      comments {
        _id
        commentText
        commentAuthor
      }
    }
  }
}
`;

export const QUERY_FRIENDS = gql`
query Query {
  friends {
    friends {
      _id
      username
      posted {
        _id
      }
    }
  }
}
`;