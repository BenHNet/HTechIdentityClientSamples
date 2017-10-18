using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace CoreAPI.Controllers
{
    [Route("api/[controller]")]
    public class TourOfHeroesController : Controller
    {
        private static List<Hero> heroes = new List<Hero>()
        {
            new Hero() { id=0, name="Zero"},
            new Hero() { id=11, name="Mr. Nice" },
            new Hero() { id=12, name="Narco" },
            new Hero() { id=13, name="Bombasto" },
            new Hero() { id=14, name="Celeritas" },
            new Hero() { id=15, name="Magneta" },
            new Hero() { id=16, name="RubberMan" },
            new Hero() { id=17, name="Dynama" },
            new Hero() { id=18, name="Dr IQ" },
            new Hero() { id=19, name="Magma"},
            new Hero() { id=20, name="Tornado" }
        };

        private static int nextId = 21;
        
        // GET api/tourofheroes
        [HttpGet]
        public string Get()
        {
            return JsonConvert.SerializeObject(heroes);
        }

        // GET api/tourofheroes/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return JsonConvert.SerializeObject(heroes.Where(x=> x.id == id).FirstOrDefault());
        }

        // POST api/tourofheroes
        [HttpPost]
        public string Post([FromBody]Hero value)
        {
            value.id = nextId;
            heroes.Add(value);
            nextId++;

            return JsonConvert.SerializeObject(heroes.Where(x => x.id == nextId-1).FirstOrDefault());
        }

        // PUT api/tourofheroes/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]Hero value)
        {
            var thisHero = heroes.Where(x => x.id == id).FirstOrDefault();
            thisHero.name = value.name;
        }

        // DELETE api/tourofheroes/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var thisHero = heroes.Where(x => x.id == id).FirstOrDefault();
            heroes.Remove(thisHero);
        }
    }

    public class Hero
    {
        public int id { get; set; }
        public string name { get; set; }
    }
}
