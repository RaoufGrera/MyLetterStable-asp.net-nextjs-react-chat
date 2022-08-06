
import { useState, useEffect } from 'react';
import { accountService,userService } from 'src/_services';
import getConfig from 'next/config';
import { useTranslation } from 'next-i18next';
import { Link } from 'components';

import router,{ useRouter } from 'next/router';
import { Field, Formik, useFormikContext } from 'formik';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const { publicRuntimeConfig } = getConfig();


const baseUrl = `${publicRuntimeConfig.imgUrl}`;


export default SearchSide;





function SearchSide({ educations, works}) {

    const {query} = useRouter();
    console.log("Query",query);

    const initialValue ={
        education : query.education || 'all',
        work : query.work || 'all',
        prices:query.prices || 'all',
        value:""

    }
  

    const { t } = useTranslation();

  

    useEffect(() => {
      
   
       var ln = userService.getAll(t('lang'));
       setProfileData(ln);
  
       console.log("inintial Filter",initialValue)

    }, []);

     
    
    const submitMyForm = (values) => {
      router.push(
        {
          pathname: '/users',
          query: { ...values, page: 1 },
        },
        undefined,
        { shallow: true }
      );
        console.log("Submit")
       
    
    }; 
    const n = 8;
     return (
        <div className="container">
         
  <div className="row">
            <div className='col-md-3'>
              
              <Formik 
              validateOnBlur={false}
              validateOnChange={false}
              initialValues={initialValue}
                onSubmit={submitMyForm} >
              {({ values,submitForm, handleChange }) => (
            <div >
            <h2>المؤهل العلمي</h2>
           
 
            {educations.map(filter =>
<li>
<label>
              <Field type="radio" name="education"  value={filter.id}   onChange={(e) => {
                handleChange(e);
                setTimeout(submitForm, 0)
               
              }} />
                {ProfileData.filter.name}
            </label>


</li>
            )
            
            }

       
           <h2>العمل</h2>
{works.map(filter =>
    <li>
<label>
              <Field type="radio" name="work"  value={filter.id} onChange={(e) => {
                handleChange(e);
                setTimeout(submitForm, 0)
               
              }}  />
                {filter.name}
            </label>


</li>
            )}
   
</div>

)}
</Formik>
            </div>
            <div className='col-md-9'>
            <h1>Users</h1>
            <h2>{ session }</h2>
   
            {!users &&  [...Array(n)].map(i => ( 
            <div  className="cv-div"> <div className="cv-body">
     <div className="devimgseeker">
  <Skeleton height="100%" containerClassName="imgseeker-view" /> 
</div>
    <table><tr> <td height="30"><h2 >
    <Skeleton width={210}/> </h2>
                <span className="texts"><Skeleton count={2} width={130}/></span><hr/></td></tr>
                <tr>
                    <td><Skeleton width={210}/> </td>
                </tr>
    </table>
</div></div>

) 
)}
                    {users && profileData &&  users.map(user =>

<div key={user.id} className="cv-div"> <div className="cv-body">
     <div className="devimgseeker">
        <Link title={user.name } href={"/profile/"+user.id }>
                                                             <img className="imgseeker-view" src={`${baseUrl}/${user.image}`} />

                                                             </Link>
         </div>
    <table><tr> <td height="30"><h2 ><Link title={user.name } id="cvname" href={"/users/"+user.id }>{user.name}</Link></h2>
                <span className="texts">{user.aboutMe} &nbsp;</span><hr/></td></tr>
                <tr>
                    <td>
                  <ul className='user-ul'>
                  { user.ageId && 
             <li>
                                 <SVGIcon  className="profile-age app-icon  field" name="age"   />

            {profileData.profile_fields.age.options[user.ageId]}
            </li> 
            }   

{ user.homeId && 
             <li>
                                 <SVGIcon  className="profile-home app-icon  field" name="home"   />

            {profileData.profile_fields.home.options[user.homeId]}
            </li> 
            } 


{ user.educationId  && 
             <li>
                 <SVGIcon  className="profile-education  app-icon  field" name="education"   />

            {profileData.profile_fields.education.options[user.educationId ]}
            </li> 
            } 

{ user.seekingId  && 
             <li>
                 <SVGIcon  className="profile-seeking   app-icon  field" name="seeking"   />

            {profileData.profile_fields.seeking.options[user.seekingId ]}
            </li> 
            } 

{ user.relationshipId  && 
             <li>
                 <SVGIcon  className="profile-relationship   app-icon  field" name="relationship"   />

            {profileData.profile_fields.relationship.options[user.relationshipId ]}
            </li> 
            } 
                <li>
               + مشاهدة المزيد
            </li> 

                      </ul>  
 		

                    </td>
                </tr>

    </table>

</div></div>
                    
                    )}
                
                    {users && !users.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No Users To Display</div>
                            </td>
                        </tr>
                    }
            
</div>
</div>
        </div>

    );
}



export async function getStaticProps() {
 
  const data = await accountService.getFilter();
  console.log(data);

  const educations = data.education;
  const works =  data.work;
  console.log(educations);
  if (!data) {
  return {notFound: true,}
  }  
  return { props: { educations,works } }
}