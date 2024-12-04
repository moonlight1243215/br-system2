import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginView from './views/loginView';
import OfficeView from './views/officeView';
import DispoView from './views/dispoView';
import PrivateRoute from './views/privateRouter';

const Root = (props) => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginView />} />
        <Route path="/dispo" element={<DispoView />} />
        <Route path="/office" element={<PrivateRoute><OfficeView /></PrivateRoute>} />
        {/* <Route path="office" element={<OfficeView />}/> */}
      </Routes>
    </Router>
  )
};

export default Root;
