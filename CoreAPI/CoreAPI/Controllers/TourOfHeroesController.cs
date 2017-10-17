using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace CoreAPI.Controllers
{
    [Route("api/[controller]")]
    public class TourOfHeroesController : Controller
    {
        // GET api/tourofheroes
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "{ id: 0, name: 'Zero' }",
                "{ id: 11, name: 'Mr. Nice' }",
                "{ id: 12, name: 'Narco' }",
                "{ id: 13, name: 'Bombasto' }",
                "{ id: 14, name: 'Celeritas' }",
                "{ id: 15, name: 'Magneta' }",
                "{ id: 16, name: 'RubberMan' }",
                "{ id: 17, name: 'Dynama' }",
                "{ id: 18, name: 'Dr IQ' }",
                "{ id: 19, name: 'Magma' }",
                "{ id: 20, name: 'Tornado' }" };
        }

        // GET api/tourofheroes/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/tourofheroes
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/tourofheroes/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/tourofheroes/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
