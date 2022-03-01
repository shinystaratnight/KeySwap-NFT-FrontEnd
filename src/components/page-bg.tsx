export const PageBG = () => {
  return (
    <div
      className="pageBG"
      style={{
        backgroundImage: `url(/img/top-left.png)`,
        position: 'absolute',
        top: 0,
        zIndex: -1,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top right',
        width: '100%',
        textAlign: 'center',
      }}
    >
      <img
        style={{
          height: '600px',
          marginTop: '100px',
          maxWidth: '100%',
        }}
        src="/img/611fc061bc30379.png"
      />
    </div>
  );
};
