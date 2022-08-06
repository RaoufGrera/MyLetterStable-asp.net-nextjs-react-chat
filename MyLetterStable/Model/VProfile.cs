using System;
using System.Collections.Generic;

namespace MyLetterStable.Model
{
    public class VProfile
    {
       

        public long id { set; get; }
        public bool online { get; set; }
        public string name { set; get; }
        public string about { set; get; }

        public string looking { set; get; }
        public List<string> hobbies { set; get; }

        public string gender { set; get; }
        public string country { set; get; }
        public string home { set; get; }

        public string age { set; get; }
        public string ask { set; get; }
        public string education { set; get; }
        public string personality { set; get; }

        public string family_values { set; get; }
        public string have_kids { set; get; }
        public string height { set; get; }
        public string polygamy_opinion { set; get; }
        public string relationship { set; get; }
        public string relocate { set; get; }
        public string sector { set; get; }
        public string seeking { set; get; }
        public string smoking { set; get; }
        public string salary { set; get; }
        public string book { set; get; }

        public string want_kids { set; get; }
        public string zodiac { set; get; }
        public string work { set; get; }
        public string driver { set; get; }

        public string image { set; get; }
        public string username { set; get; }

        public DateTime Created { get; set; }
        public string ActiveAgo { get; set; }
        public string ActiveNumber { get; set; }


    }
}
