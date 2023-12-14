import Tab from './Tab';

export default async function Contact() {
  return (
    <div
      role="tablist"
      className="tabs tabs-lifted border-white"
    >
      <Tab
        tabName="Whatsapp"
        href="telto:+557199611-6940"
        hrefContent="+55 (71) 9 9611-6940"
        iconName="Whatsapp"
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
