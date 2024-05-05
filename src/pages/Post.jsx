import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";

export default function Post() {
  const [post, setPost] = useState(null);
  const [loader, setLoader] = useState(false);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      setLoader(true);
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setLoader(false);
          setPost(post);
        } 
        else {
          setLoader(false);
          navigate("/");
        }
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  if (loader) {
    return (
      <div className='flex justify-center items-center'>
        <Loader/>
      </div>
    )
  }

  return post ? (
    <div className="py-8">
      <Container className='flex flex-col'>
        <div className="w-screen flex flex-col justify-center items-center m-16 relative border border-solid boder-2 border-white bg-white p-8">
          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl w-80"
          />
          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
          <div className="w-full m-6">
            <h1 className="text-2xl font-bold">{post.title}</h1>
          </div>
          <div className="m-auto flex flex-col justify-center items-start">
            {parse(post.content)}
          </div>
        </div>
      </Container>
    </div>
  ) : null;
}
