const path = require('path');

module.exports = function override(config, env) {
  const {resolve = {}, devServer = {}} = config;
  const {alias = {}} = resolve;

  const devServerAdditional = {    
    contentBase: [path.join(__dirname, './public')],
    index: 'index.html',
    hot: true,
    historyApiFallback: true,
    before: app => {
      // simulation of getting userinfo for local development
      app.get('/auth-user', (req, res) => {
        const {password, email=''} = req.params;

        console.log('EMAIL!!!!!!!:', email)
        if(email.includes('error')) {
          res.status(404).json({error: 'User not found'})
        } else {
          res.status(200).json({email})
        }
      });
    },
    proxy: "http://localhost:3000"
  }

  const newConfig = {
    ...config, 
    resolve: {
      ...resolve,
      alias: {
        ...alias,
        components: path.resolve(__dirname, './src/components/') 
      }
    }, 
    devServer: {
      ...devServer,
      ...devServerAdditional
    }
  };

  console.log('DEV SERVER CONFIG resolve!!!!!!', JSON.stringify(newConfig.resolve));
  return newConfig;
}