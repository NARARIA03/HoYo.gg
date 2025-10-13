import { useGetGenshinCharacterDetail } from '../hooks/queries/useGetGenshinCharacterDetail';
import { useGenshinNameAndId } from '../hooks/useGenshinNameAndId';

export default function GenshinCharacterDetailContainer() {
  const { name, id } = useGenshinNameAndId();
  const { data: characterDetail } = useGetGenshinCharacterDetail(id);

  if (!characterDetail) return null;

  return (
    <div style={{ color: 'white' }}>
      <p>{name}</p>
      <p>{id}</p>
      <p>{JSON.stringify(characterDetail)}</p>
    </div>
  );
}
