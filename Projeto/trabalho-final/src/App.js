import logo from './logo.svg';
import './App.css';
// import './css/style.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (

    <div className="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
        
          <form class="mb-md-6 mt-md-5 pb-7">

            <h2 class="fw-bold mb-2 text-uppercase" align="center">Login</h2>

            <div class="form-outline form-white mb-4">
                <label class="form-label" for="typeEmailX">Email</label>
                <input type="email" id="typeEmailX" class="form-control form-control-lg" />
               
            </div>

            <div class="form-outline form-white mb-4">
                <label class="form-label" for="typePasswordX">Senha</label>
                <input type="password" id="typePasswordX" class="form-control form-control-lg" />
               
            </div>

            <div class="form-outline form-white mb-4">
              <button type="button" class="btn btn-primary cor btn-lg form-control form-control-lg cor" >Login</button>
            </div>

            
            <p class="small mb-5 pb-lg-2"><a class="text-white-50" href="#!">Forgot password?</a></p>
            
           <div className="text-center">
            <span className="text1"> Não possui conta?</span>
            <a className="text2" href="#">Criar conta.</a>
           </div>
          </form>

        </div>
      </div>

    

    
    </div>


   
  );
}

export default App;
