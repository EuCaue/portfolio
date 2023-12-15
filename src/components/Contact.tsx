import Tab from './Tab';

export default async function Contact() {
  return (
    <div
      role="tablist"
      className="tabs tabs-lifted border-white"
    >
      <Tab
        tabName="Github"
        href="https://github.com/EuCaue"
        hrefContent="https://github.com/EuCaue"
        iconName="Github"
      />
      <Tab
        tabName="Email"
        href="mailto:souzacaue@proton.me"
        hrefContent="souzacaue@proton.me"
        iconName="mail"
      />
      <Tab
        tabName="Linkedin"
        href="http://www.linkedin.com/in/caue-souza/"
        hrefContent="in/caue-souza/"
        iconName="Linkedin"
      />
    </div>
  );
}
