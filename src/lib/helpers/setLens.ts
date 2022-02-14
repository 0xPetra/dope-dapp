import {Lens, LensOptions} from 'bread-camera';

export const setLens = async (camera, lens: Lens, launchData) => {
  // TODO: Pass prom parent as prop
  const completion = () => true;
  const options: LensOptions = {lens, launchData, completion};
  try {
    if (camera === null) {
      throw new Error('Camera ref is null!');
    }

    // TODO: Should we pass the
    setTimeout(async () => {
      await camera.setLens(options);
    }, 2000);
    // const photo = await camera.current.setLens(options);
    // TODO: Do we need any callback?
    // onLensSetted(photo, 'photo');
  } catch (e) {
    console.error('Failed to set lens!', e);
  }
};
