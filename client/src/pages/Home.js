import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import moment from 'moment';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import AlarmIcon from '@mui/icons-material/Alarm';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';


function Home() {

  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  function likePost() {
    console.log('post liked.');
  }
  
  if (data) {
    console.log(data);
  }

  const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

  

  return <div className='home'>
            {loading ?
              <h3>Loading Posts...</h3> : (
                data.getPosts && data.getPosts.map((post) => {
                  return (
                    <div className='posts-container' key={post.id}>
                      <div >
                        <p>{post.username}</p>
                        <p>{moment(post.createdAt).fromNow(true)}</p>
                        <p>{post.body}</p>
                        <Button onClick={likePost}>Likes</Button> {post.likeCount}
                      </div>
                    </div>
                )
              })
            )}
  </div>
}

const FETCH_POSTS_QUERY = gql`
{
  getPosts{
    id body createdAt username likeCount
    likes{
      username
    }
    comments{
      id username createdAt body
    }
  }
}
`



export function BasicGrid() {

  const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  }));
  
  return (
    <>
    <h1>Recent Posts</h1>
    <Box sx={{ flexGrow: 1, margin: 5 }}>
        <Grid container spacing={12}>
        <Grid item xs={12} lg={4}>
          <Item>xs=4</Item>
        </Grid> 
         <Grid item xs={12} lg={4}>
          <Item>xs=4</Item>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Item>xs=4</Item>
        </Grid>
      </Grid>
    </Box>
    </>
  );
}


export function IconButtons() {
  return (
    <Stack direction="row" spacing={1}>
      <IconButton aria-label="delete">
        <DeleteIcon />
      </IconButton>
      {/* <IconButton aria-label="delete" disabled color="primary">
        <DeleteIcon />
      </IconButton>
      <IconButton color="secondary" aria-label="add an alarm">
        <AlarmIcon />
      </IconButton>
      <IconButton color="primary" aria-label="add to shopping cart">
        <AddShoppingCartIcon />
      </IconButton> */}
    </Stack>
  );
}



export default Home;
