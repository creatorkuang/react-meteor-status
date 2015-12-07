Package.describe({
  name: 'creatorkuang:react-meteor-status',
  version: '0.0.3',
  // Brief, one-line summary of the package.
  summary: 'react package for meteor status ',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/creatorkuang/react-meteor-status.git',
  author:'creatorkuang@gmail.com',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.0.2');
  api.use('ecmascript');
  api.use('react@0.14.1_1');
  api.use('underscore');
  api.addFiles('client/connectStatus.jsx','client');
  api.export('ConnectStatus');
});
