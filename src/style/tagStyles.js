const styleObj = {
  HomePage: {
    display: 'flex',
    flexDirection: 'row',
  },

  NotionSideBar: {
    display: 'flex',
    flexDirection: 'column',
    width: '400px',
    height: '100vh',
    backgroundColor: '#e9ecef',
  },

  NotionTitle: {
    textAlign: 'center',
  },

  DocumentsList: { paddingLeft: '10px', width: 'calc(100%-10px)' },

  DocumentObject: {
    display: 'inline-flex',
    width: '100%',
  },

  DocumentLinkButton: {
    flex: 1,
    margin: '0 10px',
  },

  DocumentDetail: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },

  DocumentHeader: {
    width: '100%',
    margin: '10px 0',
  },

  EditDocument: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  DocumentTitle: {
    width: '60%',
    height: '50px',
    fontSize: '30px',
    paddingLeft: '10px',
  },

  DocumentContent: {
    width: '100%',
    height: '90vh',
  },
};

export default function styleInJS({ $target, styleTagName }) {
  for (const key in styleObj[styleTagName]) {
    $target.style[key] = styleObj[styleTagName][key];
  }
}
